require("dotenv").config();

const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running");
});

app.use("/api/ai", aiRoutes);

const PORT = 5000;

const server = app.listen(PORT, "127.0.0.1", () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});

server.on("error", (err) => {
    console.error("SERVER ERROR:", err);
});