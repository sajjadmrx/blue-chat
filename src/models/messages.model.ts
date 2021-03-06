import mongoose, { model, Schema } from 'mongoose';
import { customAlphabet } from 'nanoid'
import { MessageType } from '../enums/messageType.enum';
import { IMessage } from '../interfaces/messages.interface';


const nanoid = customAlphabet('1234567890', 28);

const messagesSchema = new Schema<IMessage>({
    chatId: { type: String, required: true },
    messageId: { type: String, default: () => nanoid() },
    content: { type: String, default: '' },
    // photo: { type: String, default: '' },
    sender: { type: Schema.Types.ObjectId, ref: 'User' },
    type: { type: Number, default: MessageType.member_chat },



}, { timestamps: true });

const messagesModel = model('Messages', messagesSchema);
export default messagesModel;