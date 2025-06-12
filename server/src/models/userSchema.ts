import mongoose, { Schema, Document } from "mongoose";

export interface iUser extends Document {
    username: string;
    email: string;
    privyId: string;
    userPfp: string;
    totalStreams: number;
    bio: string;
    followers: number;
    following: number;
    creatorToken: string;
    videoTokenAddresses: {
        tokenAddress: string;
    }[];
}

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
  xUrl: {
    type: String
  },
  YTUrl: {
    type: String
  },
  notifications: [{
    type: String,
  }],
  followers: [{
    type: String
  }],
  following: [{
    type: String
  }],
  creatorToken: {
    type: String
  },
  videoTokenAddresses: [{
    type: String
  }]
});

export const User = mongoose.model<iUser>("Users", userSchema);
