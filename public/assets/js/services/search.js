import Apis from '../apis.js'

class SearchService {


    user(value) {
        return new Promise(async (resolve, reject) => {
            try {
                const result = await Apis.searchUser(value)
                const { data } = result
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }


}


export default new SearchService()