import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import http from 'http'
import socketIO from 'socket.io'


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



const app = express()
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
        app.use(express_session({ ...sessionConfig }))
        app.use(passport.initialize())
        app.use(passport.session())
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

    }


}

export default App