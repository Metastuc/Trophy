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

const userSchema: Schema<iUser> = new Schema({
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

    privyId: {
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

    followers: {
        type: Number,
        default: 0,
    },

    following: {
        type: Number,
        default: 0,
    },

    creatorToken: {
        type: String,
    },

    videoTokenAddresses: [
        {
            tokenAddress: {
                type: String,
            },
        },
    ],
});

export const User = mongoose.model<iUser>("Users", userSchema);
