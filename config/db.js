const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected -> Connected to ${conn.connection.host}`);
  } catch (err) {
    console.log("Error occured:");
    console.log(err.message);
  }
};

module.exports = connectDB;
