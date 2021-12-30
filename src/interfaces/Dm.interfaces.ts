import { Document, Schema } from "mongoose";

export interface IDirect extends Document {

    directId: string;
    users: [Schema.Types.ObjectId, Schema.Types.ObjectId];
    createdAt: Date;
    updatedAt: Date;
    // getMessages:
}