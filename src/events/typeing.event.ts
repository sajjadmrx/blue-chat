import socketIO, { Socket } from 'socket.io'
import { IUSER } from '../interfaces/User.interfaces'


class typing {


  static eventName = 'typing'
  static isEnabled = true
  args: any
  constructor(public io: socketIO.Server, public socket: Socket, public user: IUSER, ...data: any) {
    this.args = data
    this.handle();
  }

  handle(): void {


    // const chatId: string = this.args[0];
    const chatId: string = this.args[0]?.chatId;

    //validate chatId

    // end validate chatId



    // typeing emit
    this.socket.broadcast.to(chatId).emit('typing', {
      username: this.user.username,
    })





  }

}

export default typing;