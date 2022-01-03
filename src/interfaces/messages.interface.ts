import { Document, Schema } from "mongoose";

export interface IMessage extends Document {

    chatId?: Schema.Types.ObjectId,
    messageId: string;
    content: string,
    sender: Schema.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

