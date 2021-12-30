import mongoose, { model, Schema } from 'mongoose';
import { IUSER } from '../interfaces/User.interfaces';
import { customAlphabet } from 'nanoid'
import { IDirect } from '../interfaces/Dm.interfaces';

const nanoid = customAlphabet('1234567890', 24);

const DirectSchema = new Schema<IDirect>({


    directId: { type: String, default: () => nanoid() },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }, { type: Schema.Types.ObjectId, ref: 'User' }],



}, { timestamps: true });

const dmModel = model('Direct', DirectSchema);
export default dmModel;
