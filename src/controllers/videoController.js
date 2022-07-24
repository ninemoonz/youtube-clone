import Video from "../models/Video";

export const home = async(req, res) => {
    const videos = await Video.find({}).sort({createdAt:"desc"});
    console.log(videos);
    return res.render("home", { pageTitle: "Home", videos });
};

export const watch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){        
        return res.render("404", {pageTitle: "404 Error, Video not found"});
    }
    return res.render("watch", { pageTitle: video.title, video });    
};

export const getEdit = async(req, res) =>  {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle: "404 Error, Video not found"});
    }
    return res.render("edit", {pageTitle: `Editing ${video.title}`, video});
};

export const postEdit = async(req, res) => {
    const { id } = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({_id:id});
    if(!video){
        return res.render("404", {pageTitle: "404 Error, Video not found"});
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
    });
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
            hashtags: Video.formatHashtags(hashtags),
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

export const deleteVideo = async(req, res) => {
    const { id } = req.params;
    console.log(id);
    // delete video
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};

export const search = async(req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if(keyword){
        //searching method
        videos = await Video.find({
            title: {
                $regex: new RegExp(`${keyword}`, "ig"),
            },
        });
    }
    return res.render("search", { pageTitle: "Search", videos});
}