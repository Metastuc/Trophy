import mongoose from "mongoose";
import { DEFAULT_IMAGE } from "../utils/env";

const notificationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  follow: {
    content: {
      type: String,
      default: "",
    },
    followNots: [String],
    recentFollows: {
      type: Number,
      default: 0,
    },
    followedAt: {
      type: Date,
      default: Date.now,
      expires: "7d",
    },
  },
  tip: [
    {
      token: String,
      amount: String,
      tipper: String,
    },
  ],
  buy: [String],
});

const userSchema = new mongoose.Schema({
  privyId: {
    type: String,
    required: true,
    unique: true,
  },
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
    default: DEFAULT_IMAGE,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
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

export const Notification = mongoose.model("notifications", notificationSchema);
