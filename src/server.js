import express from "express";
import morgan from "morgan";

const PORT = 4000;

// Creating a server
const app = express();
const logger = morgan("dev");
app.use(logger);

//routers
const globalRouter = express.Router();
const handleHome = (req, res) => res.send("Home");
globalRouter.get("/", handleHome);

const userRouter = express.Router();
const handleEditUser = (req, res) => res.send("Edit User");
userRouter.get("/edit", handleEditUser);

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("Watch Video");
const handleListVideo = (req, res) => res.send("List of Videos");
videoRouter.get("", handleListVideo);
videoRouter.get("/watch", handleWatchVideo);


app.use("/", globalRouter); 
app.use("/videos", videoRouter);
app.use("/user", userRouter);



// Making the server to listen
const handleListening = () => console.log(`Server is listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);