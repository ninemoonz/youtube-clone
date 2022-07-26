import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import { localsMiddleware } from "./middlewares";

// Creating a server
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");

app.use(logger);
app.use(express.urlencoded({ extended: true })); // understands and transform the value in the form into javascript object

app.use(session({
    secret: "Hello",
    resave: false,
    saveUninitialized: false, //uninitialize session if it is new but not modified.
    store: MongoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/youtubeclone"}),
})
);

app.use(localsMiddleware);
app.use("/", rootRouter); 
app.use("/videos", videoRouter);
app.use("/user", userRouter);

export default app;