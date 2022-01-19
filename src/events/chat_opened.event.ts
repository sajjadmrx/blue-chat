import socketIO, { Socket } from 'socket.io'
import { IUSER } from '../interfaces/User.interfaces'


class ChatOpened {


  static eventName = 'chat_opened'
  static isEnabled = true
  args: any
  constructor(public io: socketIO.Server, public socket: Socket, public user: IUSER, ...data: any) {
    this.args = data
    this.handle();
  }

  handle(): void {


    const chatId: string = this.args[0];


    this.socket.join(chatId);

  }

}

export default ChatOpened;