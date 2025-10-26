require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const questionRoutes = require("./routes/questionRoutes");
const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");
const { protect } = require("./middlewares/authMiddleware");
const axios = require("axios");


const app = express();


const url ="https://lmp-backend.onrender.com";
const interval = 30000; // 30 seconds

let lastReloadTime = "Not yet reloaded";
function reloadWebsite() {
  axios
    .get(url)
    .then(() => {
      lastReloadTime = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });
      console.log(`✅ Website reloaded at ${lastReloadTime}`);
    })
    .catch((error) => {
      console.error(`❌ Error reloading website: ${error.message}`);
    });
}
setInterval(reloadWebsite, interval);

// optional: trigger once on startup
reloadWebsite();


const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

connectDB();

app.use(express.json());



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);

// // AI routes with auth protection middleware
app.use("/api/ai/generate-questions", protect, generateInterviewQuestions);
app.use("/api/ai/generate-explanation", protect, generateConceptExplanation);



app.use("/uploads", express.static(path.join(__dirname, "uploads"),{}));



app.get("/", (req, res) => {
  res.send(`Last time website reloaded: ${lastReloadTime}`);  
});

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
