import { Document } from "mongoose";

export interface IUSER extends Document {
    userId: string;
    username: string;
    password: string;
    email: string;
    provider: string;
    avatar: string;
    socketId: string;
    isOnline: boolean;
    lastOnline: Date;
    createdAt: Date;
    updatedAt: Date;
}