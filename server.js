const path = require("path");
const cors = require("cors");
const express = require("express");
const ideasRouter = require("./router/ideas");
const mongoose = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 2306;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connection Established!..."))
  .catch((err) => {
    console.log("something Wrong");
  });
const app = express();

//Static folder
app.use(express.static(path.join(__dirname, "public")));

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors middleware
app.use(
  cors({
    origin: ["http://localhost:7004", "http://localhost:4000"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to random ideas" });
});

app.use("/api/ideas", ideasRouter);

app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});
