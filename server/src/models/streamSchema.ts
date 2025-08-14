import mongoose from "mongoose";

const streamSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: null,
  },
  creatorToken: {
    type: String
  },
  viewers: {
    type: Number,
    default: 0
  },
  pfp: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String
  },
  status: {
    type: String,
    required: true,
    enum: ["Live", "Scheduled", "Ended"],
  },
  streamer: {
    type: String,
    required: true,
  },
});

export const Stream = mongoose.model("Streams", streamSchema);
