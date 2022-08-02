//init.js is going to have anything to do with importing fundamental fines and start the server
// server.js will only handling code related to expressJSs
import "dotenv/config";

import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;
// Making the server to listen
const handleListening = () => console.log(`✅ Server is listening on port http://localhost:${PORT} 🚀`);
app.listen(PORT, handleListening);