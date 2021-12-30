import dotenv from 'dotenv';
dotenv.config();

const port: number = 4000
import App from './app'
new App(port)