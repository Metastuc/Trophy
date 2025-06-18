import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userPfp: {
    type: String,
    required: true,
  },
  totalStreams: {
    type: Number,
    default: 0,
  },
  bio: {
    type: String,
    default: "",
  },
  totalFees: {
    type: Number,
    default: 0,
  },
  xUrl: {
    type: String,
  },
  YTUrl: {
    type: String,
  },
  notifications: [
    {
      type: String,
    },
  ],
  followers: [
    {
      type: String,
    },
  ],
  following: [
    {
      type: String,
    },
  ],
  creatorToken: {
    type: String,
  },
  videoTokenAddresses: [
    {
      type: String,
    },
  ],
});

export const User = mongoose.model("Users", userSchema);
