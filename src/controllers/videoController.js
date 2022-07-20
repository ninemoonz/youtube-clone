export const trending = (req, res) => res.render("home", { pageTitle: "Home" });

export const see = (req, res) => res.render("watch", { pageTitle: "VideoTitle"});

export const edit = (req, res) => {
    
    return res.send("Edit");
};
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.upload("upload");

export const deleteVideo = (req, res) => {
   
   return res.send("Delete video");
};