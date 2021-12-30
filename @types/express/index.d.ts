import { IUSER } from "../../src/interfaces/User.interfaces";

declare global {
    namespace Express {
        interface Request {
            currentUser: IUSER;
        }
    }
}