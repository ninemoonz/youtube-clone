import express from "express";
import morgan from "morgan";

import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";




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

export default app;