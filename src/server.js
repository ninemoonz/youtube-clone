import express from "express";

const PORT = 4000;

// Creating a server
const app = express();

//middleware
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

// This is the place where we write configuration of the server
const handleMain = (req, res) => {
    return res.send("I'm at the end");
};

app.get("/", logger, handleMain);

// Making the server to listen
const handleListening = () => console.log(`Server is listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);