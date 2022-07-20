
export const trending = (req, res) => {
    const videos = [
        {
            title: "Planet of Apes",
            rating: 4.3,
            comments: 23,
            createdAt: "2 minutes ago",
            views: 220,
            id: 1,
        },
        {
            title: "Planet of Apes 2",
            rating: 4.3,
            comments: 23,
            createdAt: "2 minutes ago",
            views: 220,
            id: 1,
        },
        {
            title: "Planet of Apes 3",
            rating: 4.3,
            comments: 23,
            createdAt: "2 minutes ago",
            views: 220,
            id: 1,
        },

    ];
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