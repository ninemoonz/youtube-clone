import User from "../models/User";

export const getJoin = (req, res) => res.render("join", {pageTitle: "Join"});

export const postJoin = async(req, res) => {
    const {name, username, email, password, password2, location} = req.body;
    const pageTitle = "Join";
    const exists = await User.exists({$or:[{username}, {email}]});
    if(password !== password2){
        return res.render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match"
        })
    }
    if(exists){
        return res.render("join", {
            pageTitle, 
            errorMessage: "This username/email is already taken."});
    }
    await User.create({
        name, 
        username,
        email, 
        password, 
        location,
    });
    res.redirect("/login");
};

export const edit = (req, res) => res.render("edit", {pageTitle: "Edit"});
export const remove = (req, res) => res.send("Delete user");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const watch = (req, res) => res.send("Watch video");