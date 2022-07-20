
export const trending = (req, res) => {
    const videos = [1,2,3,4,5,6];
    res.render("home", { pageTitle: "Home", videos });
};

export const see = (req, res) => res.render("watch", { pageTitle: "VideoTitle"});

export const edit = (req, res) => {
    
    return res.send("Edit");
};
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.upload("upload");

export const deleteVideo = (req, res) => {
   
   return res.send("Delete video");
};