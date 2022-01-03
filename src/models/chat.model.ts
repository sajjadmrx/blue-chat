import mongoose, { model, Schema } from 'mongoose';
import { customAlphabet } from 'nanoid'
import { IUSER } from '../interfaces/User.interfaces';
import { IChat } from '../interfaces/IChat.interfaces';

const nanoid = customAlphabet('1234567890', 24);

const ChatSchema = new Schema<IChat>({


    chatId: { type: String, default: () => nanoid() },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isGroup: { type: Boolean, default: false },


}, { timestamps: true });

ChatSchema.methods.getUsers = async function (): Promise<IUSER[]> {
    const x = await this.populate('users', 'userId username avatar')
    //change users type to IUSER

    return x.users as IUSER[]
}

const chatModel = model('Chat', ChatSchema);
export default chatModel;
