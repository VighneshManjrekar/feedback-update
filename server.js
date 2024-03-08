require("dotenv").config();

const express = require("express");
const cors = require("cors");
const updateStatus = require("./mail")
const connectDB = require("./config/db");
const Application = require("./models/Application");
const User = require("./models/User");
const Job = require("./models/Job");

const app = express();
const PORT = process.env.PORT || 7001;

app.use(cors());
app.get("/", (req, res) =>
  res.status(200).json({ success: true, message: "Server running" })
);
app.use("/api/v1/job/applications/:id/seen", async (req, res) => {
  const pixel = Buffer.from(
    "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==",
    "base64"
  );

  const application = await Application.findByIdAndUpdate(req.params.id, {
    status: "seen",
  });
  const user = await User.findById(application.user);
  const job = await Job.findById(application.job);
  await updateStatus(user, job, pixel);
  res.set("Content-Type", "image/gif");
  res.send(pixel);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectDB();
});
