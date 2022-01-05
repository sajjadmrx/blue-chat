import { Document, Schema } from "mongoose";
import { MessageType } from "../enums/messageType.enum";

export interface IMessage extends Document {

    chatId?: Schema.Types.ObjectId,
    messageId: string;
    content: string,
    sender: Schema.Types.ObjectId,
    type: MessageType,
    createdAt: Date,
    updatedAt: Date
}

export interface IMessageBody {
    chatId: string,
    content: string,
    type: MessageType
}