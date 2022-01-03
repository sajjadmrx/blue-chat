import { Document, Schema } from "mongoose";
import { IUSER } from "./User.interfaces";




export interface IChat extends Document {

    chatId: string;
    users: Schema.Types.ObjectId[] | IUSER[];
    // latestMessage

    isGroup: boolean;
    createdAt: Date;
    updatedAt: Date;
    getUsers(): Promise<IUSER[]>;
    // getMessages:
}

interface IGroup extends IChat {
    name: string;
    avatar: string;
}