import mongoose, { model, Schema } from 'mongoose';
import { IUSER } from '../interfaces/User.interfaces';
import { customAlphabet } from 'nanoid'


const nanoid = customAlphabet('1234567890', 16);

const UserSchema = new Schema<IUSER>({
    userId: { type: String, unique: true, default: () => nanoid() },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    provider: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true,
        default: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
    },
    socketId: {
        type: String,
        required: false,
    },
}, { timestamps: true });

const userModel = model('User', UserSchema);

export default userModel;