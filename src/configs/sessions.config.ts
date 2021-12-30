import session from "express-session"
import MongoStore from "connect-mongo";
import mpngoose from "mongoose";
const sessionConfig = {

    name: 'obcured.sid',
    secret: 'uNDwJw77JRkloCFIgnwlb0ZUY7fb4-twYOw_mC_lsK02ZPEj1iVw3LDFyRPqA13PEddX3BvqNr80FbbC5EThlbebY4',
    // resave: true,
    resave: false,
    saveUninitialized: true,
    //unset: 'destroy',
    cookie: {
        secure: (process.env.NODE_ENV == 'production') ? true : false,
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    },
    proxy: (process.env.NODE_ENV == 'production') ? true : false,
    store: new MongoStore({ mongoUrl: process.env.MONGODB_URI || "" }),
    rolling: true,

}
export default sessionConfig;