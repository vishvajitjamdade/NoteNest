const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // parse JSON body
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.send("Notely API is running...");
});

app.use("/api/notes", noteRoutes);

// Error handler (after routes)
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
