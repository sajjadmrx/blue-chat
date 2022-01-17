const socket = io('/');

class clientSocket {

    emit(event, ...args) {

        socket.emit(event, ...args)
    }

    on(event, callback) {
        socket.on(event, callback)
    }
}

export default new clientSocket()