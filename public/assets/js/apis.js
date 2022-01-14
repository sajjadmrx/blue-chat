class methods {
    #baseUrl = '/api';

    get(path) {
        return axios.get(this.#baseUrl + path)
    }


    post(path, data) {
        return axios.post(this.#baseUrl + path, data)
    }

    delete() { }
}

class Apis extends methods {



    searchUser(input) {
        return this.get(`/users?username=${input}`)
    }

    getChatWithId(chatId) {
        return this.get(`/chats/${chatId}`)
    }

    getMeData() {
        return this.get(`/users/me`)
    }

}

export default new Apis()