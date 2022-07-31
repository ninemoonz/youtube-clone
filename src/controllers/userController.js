import User from "../models/User";
import Video from "../models/Video";
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
    const user = await User.findOne({ username, socialOnly: false });
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

export const finishGithubLogin = async(req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await 
    (await fetch(finalUrl, {
        method:"POST",
        headers:{
            Accept: "application/json",
            },
        })
    ).json();
    //extracts json from the data
    if("access_token" in tokenRequest){
        // access api
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (
            await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`,
                },
            })
        ).json();

        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`,
                },
            })
        ).json();

        const emailObj = emailData.find(
            (email) => email.primary === true && email.verified === true
            );
        if(!emailObj){
            return res.redirect("/login"); //add notification error later.
        }
        let user = await User.findOne({ email: emailObj.email });
        
        if(!user){
            user = await User.create({
                name: userData.name, 
                username: userData.login,
                avatarUrl: userData.avatar_url,
                email: emailObj.email, 
                password: "", 
                location: userData.location,
                socialOnly: true,
            });
        }
                req.session.loggedIn = true;
                req.session.user = user;
                return res.redirect("/");
            }else {
                return res.redirect("/login"); //add notification error later.
            }
        };   

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};
//Edit Profile controllers
export const getEdit = (req, res) => {
    res.render("edit-profile", {pageTitle: "Edit Profile"});
};

export const postEdit = async (req, res) => {
    const {
        session: {
            user: {_id, avatarUrl},
        },
        body: {name, email, username, location, },
        file, 
    } = req;
    
    /*
     So these two if statements check -
     "Give an error when the value we put in exist in the usersDB,
     even if it is different from the sessionDB"
     */
    if(username !== req.session.user.username){
        const existingUsername = await User.exists({ username });
        if(existingUsername){
            return res.status(400).render("edit-profile", { 
                errorMessage: "This username is already taken."});
        };
    };
    if(email !== req.session.user.email){
        const existingEmail = await User.exists({ email });
        if(existingEmail){
        return res.status(400).render("edit-profile", { 
            errorMessage: "This username is already taken."});
        };
    };

    const updatedUser = await User.findByIdAndUpdate(_id, {
        avatarUrl: file ? file.path : avatarUrl,
        name,
        email,
        username,
        location,
    },
    {new: true});
    req.session.user = updatedUser;
    res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {
    if(req.session.user.socialOnly === true) {
        return res.redirect("/");
    }
    return res.render("users/change-password", {pageTitle: "Change Password"});
};
export const postChangePassword = async (req, res) => {
    // Send notification
    const {
        session: {
            user: {_id},
        },
        body: {oldPassword, newPassword, newPasswordConfirmation},
    } = req;
    const user = await User.findById(_id);
    const ok = await bcrypt.compare(oldPassword, user.password);
    if(!ok){
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password", 
            errorMessage: "Current password is incorrect!"})
    }
    if(newPassword !== newPasswordConfirmation){
        return res.status(400).render("users/change-password", {
            pageTitle: "Change Password", 
            errorMessage: "The new password does not match!"})
    }
    
    user.password = newPassword;
    await user.save();

    // send notification
    return res.redirect("/users/logout");
};
export const see = async (req, res) => {
    const {id} = req.params;
    const user = await User.findById(id).populate("videos");
    
    if(!user){
        return res.status(404).render("404", {pageTitle: "User not found"});
    }

    return res.render("users/profile", {
        pageTitle: user.username, 
        user,
    });
} 