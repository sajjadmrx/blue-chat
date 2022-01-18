
import Apis from '../apis.js'
import chatBodyUi from '../ui/chatBodyUi.js'
import chat_sidebar from '../ui/chat_sidebar.js'
import * as store from '../store.js'

import clientSocket from '../socket.js'

class ChatService {


    async getChats() {
        const results = await Apis.getChats()
        const { data } = results;

        data.chats.map(chat => {
            if (!chat.isGroup) {
                chat.user = chat.users.filter(user => user.userId != store.getMyId())[0]
            }

            if (!chat.isGroup) {
                chat.name = chat.user.username // user
                chat.avatar = chat.user.avatar // user
            }
            chat_sidebar.add(chat)
        })
    }

    async openChat(chatId) {
        const resultChat = await Apis.getChatWithId(chatId)

        let chat = resultChat.data

        const resultMessages = await Apis.getMessages(chat.chatId)
        const messages = resultMessages.data
        const myId = store.getMyId()


        if (!chat.isGroup) {
            chat.user = chat.users.filter(user => user.userId != myId)[0]
        }


        if (!chat.isGroup) {
            chat.name = chat.user.username // user
            chat.avatar = chat.user.avatar // user
        }

        chatBodyUi.open(chat, messages)
        chat_sidebar.add(chat, 'active')
    }


    async sendMessage(chatId, content) {
        try {
            const results = await Apis.sendMessage(chatId, content)
            const { data } = results;

            if (results.status == 200) {

                // return true
                chatBodyUi.addMessage(data)
                clientSocket.emit('message', data)
                chat_sidebar.setLastMessage(chatId, content)
            }
            else {
                throw new Error('error')
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

}


export default new ChatService()