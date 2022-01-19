import socketIO, { Socket } from 'socket.io'
import { IMessageSocket } from '../interfaces/messages.interface'
import { IUSER } from '../interfaces/User.interfaces'
import chatModel from '../models/chat.model'
import { Document, Schema } from "mongoose";
class Message {


    static eventName = 'message'
    static isEnabled = true
    args: any
    constructor(public io: socketIO.Server, public socket: Socket, public user: IUSER, ...data: any) {
        this.args = data
        this.handle();
    }

    async handle(): Promise<void> {
        const data: IMessageSocket = this.args[0];


        const chat = await chatModel.findOne({ chatId: data.chatId }).populate('users')
        if (!chat) {
            return;
        }
        chat.users.forEach(us => {
            us = us as IUSER
            if (us.userId !== this.user.userId) {
                this.socket.to(us.userId).emit('message', data)
            }
        })

        chat.latestMessage = data._id as Schema.Types.ObjectId
        await chat.save()
    }

}

export default Message;