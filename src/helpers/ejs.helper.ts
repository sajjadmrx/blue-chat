import { Request, Response } from "express";
import path from "path";

class Ejs {
    req: Request;
    res: Response;
    constructor(req: Request, res: Response) {
        this.req = req
        this.res = res

    }

    handel() {
        return {
            req: this.req,
            getJson: this.getJson,
            //    getPlayerStatus: this.getPlayerStatus,
            viewPath: this.viewPath,
            //   pt: persianTools,
            // moment: moment
        }
    }


    getJson(data: string) {
        return JSON.parse(data);
    }



    viewPath(dir: string) {
        return path.resolve('./views' + '/' + dir);
    }

}

export default Ejs;