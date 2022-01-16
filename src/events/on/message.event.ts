// on: messageFile.ts

class message {


    static eventName = 'message'
    static isEnabled = true
    constructor(data: any, args: any) {
        console.log(args);
    }


}

export default message;