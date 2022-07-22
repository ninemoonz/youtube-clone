import Video from "../models/Video";

export const home = async(req, res) => {
    const videos = await Video.find({});
    console.log(videos);
    return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    return res.render("watch", { pageTitle: `You're Watching: ${video.title}`, video });
};
export const getEdit = (req, res) =>  {
    const { id } = req.params;
    
    return res.render("edit", {pageTitle: `Editing: ${video.title}`, });
};
export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};
export const postUpload = async (req, res) => {
    // Here we add a video in the videos array.
    const { title, description, hashtags } = req.body;
    try{
        await Video.create({
            title, //abbreviation of title: title, 
            description,
            hashtags: hashtags.split(",").map(word =>(`#${word}`)),
        });
        return res.redirect("/");
    }
    catch(error){
        console.log(error);
        return res.render("upload", { 
            pageTitle: "Upload Video", 
            errorMessage: error._message, });
    }


};