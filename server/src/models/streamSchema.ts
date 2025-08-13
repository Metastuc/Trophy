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
