import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";


export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"});

export const postJoin = async(req, res) => {
    
    const {name, username, email, password, password2, location} = req.body;
    const pageTitle = "Join";
    const exists = await User.exists({$or:[{username}, {email}]});
    
    if(password !== password2){
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match"
        })
    }
    if(exists){
        return res.status(400).render("join", {
            pageTitle, 
            errorMessage: "This username/email is already taken."});
    }

    try{
        await User.create({
            name, 
            username,
            email, 
            password, 
            location,
        });
        res.redirect("/login");
    }
    catch(error){
        return res.status(400).render("join", {
            pageTitle: "Login",
            errorMessage: error._message,
        });
    }
    
};

export const getLogin = (req, res) => {
    res.render("login", {pageTitle: "Login"});
 
};
export const postLogin = async(req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({ username });
    const pageTitle = "Login";
    // check if account exists
    if(!user){
        return res.status(400).render("login", {
            pageTitle, 
            errorMessage: "An account with this username doesn't exists"});
    }
    // check if password correct
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "The password is not correct!"});
    }
    req.session.loggedIn = true;
    req.session.user = user;
    //this two req.session initialize the session
    res.redirect("/");
};

export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};
//code=070d0a1694d7800d90c5

export const finishGithubLogin = async(req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;

    const tokenRequest = await (await fetch(finalUrl, {
        method:"POST",
        headers:{
            Accept: "application/json",
        },
    })).json();
    //extracts json from the data
    if("access_token" in tokenRequest){
        // access api
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })).json();
        console.log(userData);

        const emailData = await (await fetch(`${apiUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })).json();
        const email = emailData.find(email => email.primary === true && email.verified === true);
        console.log(email);
        if(!email){
            res.redirect("/login"); //add notification error later.
        }
    }else {
        res.redirect("/login"); //add notification error later.
    }
};

export const edit = (req, res) => res.render("edit", {pageTitle: "Edit"});
export const remove = (req, res) => res.send("Delete user");
export const logout = (req, res) => res.send("Logout");
export const watch = (req, res) => res.send("Watch video");