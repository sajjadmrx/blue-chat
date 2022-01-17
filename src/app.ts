import fs from 'fs'
import path from 'path'
import http from 'http'
import express, { Request, Response, NextFunction } from 'express'
import socketIO, { Socket } from 'socket.io'

import passport from 'passport';
import express_session from 'express-session';

// tools
import httpContext from "express-http-context";

// routers
import mainApi from './routes/api/main.api'
import mainWeb from './routes/web/main.web'
import dataBaseMongo from './bin/db.bin'
import sessionConfig from './configs/sessions.config';
import Ejs from './helpers/ejs.helper';
import { IUSER } from './interfaces/User.interfaces'

// const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

const app = express()

const wrap = (middleware: any) => (socket: Socket, next: any) => middleware(socket.request, {}, next);

class App {

    private server: http.Server = new http.Server(app)
    private port: number

    private io: socketIO.Server = new socketIO.Server(this.server)

    constructor(port: number) {
        this.port = port
        this.setUpApp()
        this.setConfig()
        this.setRoutes()
        this.setSocketIO()
    }

    async setUpApp(): Promise<void> {
        try {
            this.server.listen(this.port)
            await dataBaseMongo.connect()
            console.log(`Server listening on port ${this.port}.`)
        } catch (error) {
            process.exit(1)
        }
    }

    setConfig(): void {
        app.use(express.json())
        app.use(express.urlencoded({ extended: true }))
        app.use(httpContext.middleware)
        app.use(express.static(path.resolve('./public')))
        require('./passports/google.passport')

        const sessionMiddleware = express_session({ ...sessionConfig })
        app.use(sessionMiddleware)


        app.use(passport.initialize())
        app.use(passport.session())

        this.io.use(wrap(sessionMiddleware));
        this.io.use(wrap(passport.initialize()));
        this.io.use(wrap(passport.session()));

        app.use(express.static(path.resolve('public')))
        app.set('views', path.resolve('views'))
        app.set('view engine', 'ejs')


        app.use((req: Request, res: Response, next: NextFunction) => {
            res.locals = new Ejs(req, res).handel()
            next()
        })

    }

    setRoutes(): void {
        app.use('/api', mainApi, (req: Request, res: Response) => {
            res.sendStatus(404).json({
                message: 'Not found'
            })
        })
        app.use('/', mainWeb)
    }

    setSocketIO(): void {
        this.io.use((socket: Socket, next: any) => {

            const request = socket.request as Request
            //console.log(request.user)
            if (!request.user) {
                return next(new Error('Authentication error'))
            }

            next()

            // more details : https://github.com/socketio/socket.io/blob/master/examples/passport-example/index.js
        });
        this.io.on('connection', (socket: Socket) => {
            console.log('New client connected')

            const request = socket.request as Request
            const user = request.user as IUSER
            /// on Events
            const eventFiles = fs.readdirSync(path.resolve('./src/events/on'))
            for (const file of eventFiles) {
                const eventClass = require(path.resolve(`./src/events/on/${file}`)).default
                if (!eventClass.isEnabled)
                    return;

                socket.on(eventClass.eventName, (...args: any) => {
                    new eventClass(this.io, socket, user, ...args)

                })
            }

            // emit Events
            const emitFiles = fs.readdirSync(path.resolve('./src/events/emits'))
            for (const file of emitFiles) {
                const eventClass = require(path.resolve(`./src/events/emits/${file}`)).default
                if (!eventClass.isEnabled)
                    return;

                socket.emit(eventClass.eventName, (...args: any) => {
                    new eventClass(this.io, socket, user, ...args)
                })
            }



            socket.on('disconnect', () => {
                console.log('Client disconnected')
            })
        })
    }


}

export default App