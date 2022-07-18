import express from "express";
import morgan from "morgan";

const PORT = 4000;

// Creating a server
const app = express();
const logger = morgan("dev");

//middleware
// This is the place where we write configuration of the server
const handleMain = (req, res) => {
    return res.send("Main Page");
};

const handleLogin = (req, res) => {
    return res.send("Login success");
}

app.use(logger);
app.get("/", handleMain);
app.get("/login", handleLogin);

// Making the server to listen
const handleListening = () => console.log(`Server is listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);