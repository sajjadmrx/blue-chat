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

    sendMessage(chatId, content) {
        let data = {
            content: content,
            chatId: chatId
        }

        return this.post(`/messages`, data)
    }

    getMessages(chatId) {
        return this.get(`/messages/${chatId}`)
    }

    getChats() {
        return this.get(`/chats`)
    }

}

export default new Apis()