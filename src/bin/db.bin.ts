import mongoose from 'mongoose';
class dataBaseMongo {


    static connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test",)
                .then(() => {
                    resolve()
                })
                .catch(err => {
                    reject(err)
                })
        })
    }

}

export default dataBaseMongo