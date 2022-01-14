class message {


    static eventName = 'poke'
    static isEnabled = true
    constructor(data: any, args: any) {
        console.log(args);
    }


}

export default message;
console.log('message.event.ts');