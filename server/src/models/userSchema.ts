import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  userPfp: {
    type: String,
    required: true
  },
  totalStreams: {
    type: Number,
    default: 0
  },
  bio: {
    type: String,
    default: ""
  },
  followers: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  creatorToken: {
    type: String
  },
  videoTokenAddresses: [{
    tokenAddress: {
      type: String
    }
  }]
});

export const User = mongoose.model("Users", userSchema);