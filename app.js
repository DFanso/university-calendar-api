require("dotenv").config();
const mongoose = require("mongoose");
const eventRoutes = require("./routes/events");
const degreeRoutes = require("./routes/degrees");
const facultyRoutes = require("./routes/faculties");
const batchRoutes = require("./routes/batches");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to the database");
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/events", eventRoutes);
app.use("/api/degrees", degreeRoutes);
app.use("/api/faculties", facultyRoutes);
app.use("/api/batches", batchRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
