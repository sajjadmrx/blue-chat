import mongoose, { model, Schema } from 'mongoose';
import { customAlphabet } from 'nanoid'
import { IMessage } from '../interfaces/messages.interface';


const nanoid = customAlphabet('1234567890', 28);

const messagesSchema = new Schema<IMessage>({
    chatId: { type: Schema.Types.ObjectId, ref: 'Chats' },
    messageId: { type: String, default: () => nanoid() },
    content: { type: String, default: '' },
    // photo: { type: String, default: '' },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },




}, { timestamps: true });

const messagesModel = model('Messages', messagesSchema);
export default messagesModel;