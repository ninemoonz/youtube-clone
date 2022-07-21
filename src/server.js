import "./db";
import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const PORT = 4000;

// Creating a server
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true })); // understands and transform the value in the form into javascript object
app.use("/", globalRouter); 
app.use("/videos", videoRouter);
app.use("/user", userRouter);


// Making the server to listen
const handleListening = () => console.log(`✅ Server is listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);