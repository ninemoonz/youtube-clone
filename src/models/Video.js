import mongoose from "mongoose";

//define the shape: schema
const videoSchema = new mongoose.Schema({
    title: String,
    description: String,
    createdAt: {type: Date, required: true},
    hashtags: [{type: String}],
    meta: {
        views: Number,
        rating: Number,
    },
});

//actual model
const Video = mongoose.model("Video", videoSchema);
export default Video;