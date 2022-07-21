import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/youtubeclone", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection; //Mongoose give access to the connection

const handleOpen = () => console.log("✅ Connected to DB ");
const handleError = (error) => console.log("❌ DB Error", error)

db.once("open", handleOpen) //ONly happens once
db.on("error", handleError); //on can happen many times