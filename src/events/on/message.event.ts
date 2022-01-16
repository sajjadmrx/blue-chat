import socketIO, { Socket } from 'socket.io'
import { IMessageSocket } from '../../interfaces/messages.interface'
class Message {


    static eventName = 'message'
    static isEnabled = true
    args: any
    constructor(public io: socketIO.Server, public socket: Socket, ...data: any) {
        this.args = data
        this.handle();
    }

    handle(): void {
        const data: IMessageSocket = this.args[0];

        // send to chatId
        // this.io.to(data.chatId as string).emit(Message.eventName, data);
    }

}

export default Message;