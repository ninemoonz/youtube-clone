import "dotenv/config";

import "./db";
import "./models/Video";
import "./models/User";
import app from "./server";

const PORT = 4000;
// Making the server to listen
const handleListening = () => console.log(`✅ Server is listening on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);