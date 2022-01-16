import { Document, Schema } from "mongoose";
import { MessageType } from "../enums/messageType.enum";
import { IUSER } from "./User.interfaces";

export interface IMessage extends Document {

    chatId: String,
    messageId: string;
    content: string,
    sender: Schema.Types.ObjectId | string | IUSER,
    type: MessageType,
    createdAt: Date,
    updatedAt: Date
}

export interface IMessageBody {
    chatId: string,
    content: string,
    type: MessageType
}

export interface IMessageSocket extends IMessage {
    /// more fields
}