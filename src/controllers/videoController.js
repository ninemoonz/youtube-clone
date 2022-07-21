let videos = [
    {
        title: "Planet of Apes",
        rating: 4.3,
        comments: 23,
        createdAt: "15 minutes ago",
        views: 1,
        id: 1,
    },
    {
        title: "Planet of Apes 2",
        rating: 4.3,
        comments: 23,
        createdAt: "12 minutes ago",
        views: 2,
        id: 2,
    },
    {
        title: "Planet of Apes 3",
        rating: 4.3,
        comments: 23,
        createdAt: "2 minutes ago",
        views: 100,
        id: 3,
    },
];

export const trending = (req, res) => res.render("home", { pageTitle: "Home", videos });

export const watch = (req, res) => {
    const { id } = req.params;
    const video = videos[id -1];
    return res.render("watch", { pageTitle: `You're Watching ${video.title}`, video});
};
export const getEdit = (req, res) =>  {
    const { id } = req.params;
    const video = videos[id -1];
    return res.render("edit", {pageTitle: `Editing: ${video.title}`, video});
};
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id - 1].title = title;
    console.log(title);
    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = (req, res) => {
    // Here we add a video in the videos array.
    const { title } = req.body;
    const newVideo = {
        title,
        rating: 0,
        comments: 0,
        createdAt: "Just Now",
        views: 0,
        id: videos.length + 1,
    }
    videos.push(newVideo);
    return res.redirect("/");

}