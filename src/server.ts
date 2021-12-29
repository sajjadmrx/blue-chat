import express from 'express'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'

const port: number = 4000

const app = express()
class App {

    private server: http.Server = new http.Server(app)
    private port: number

    private io: socketIO.Server = new socketIO.Server(this.server)

    constructor(port: number) {
        this.port = port
        this.setUpApp()
        this.configureApp()
        this.configureRoutes()

        this.setSocketIO()




    }

    setUpApp() {
        this.server.listen(this.port)
        console.log(`Server listening on port ${this.port}.`)
    }

    configureApp() {
        app.use(express.static(path.join(__dirname, '../client')))

    }

    configureRoutes() {
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'))
        })
    }

    setSocketIO() {

    }


}

new App(port)