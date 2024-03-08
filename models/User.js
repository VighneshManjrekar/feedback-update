const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      select: false,
    },
    profile: {
      type: String,
      default:
        "https://pbs.twimg.com/profile_images/926156469577199616/Nh63c33Q_400x400.jpg",
    },
    resume: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    role: {
      type: String,
      enum: ["seeker", "employer","admin"],
      default: "seeker",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
