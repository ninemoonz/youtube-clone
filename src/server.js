import express from "express";

const PORT = 4000;

// Creating a server
const app = express();

// This is the place where we write configuration of the server
const handleMain = (req, res) => {
    return res.send("Wake up, Neo...");
};

const handleLogin = (req, res) => {
    return res.send({redPill: "You stay here."});
}

app.get("/", handleMain);
app.get("/login", handleLogin);


// Making the server to listen
const handleListening = () => console.log(`Server is listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);