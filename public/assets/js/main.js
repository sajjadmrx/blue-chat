import apis from "./apis.js";

import chatService from './services/chats.js'
import * as store from './store.js'
import clientSocket from './socket.js'
import chatBodyUi from "./ui/chatBodyUi.js";
import chat_sidebar from "./ui/chat_sidebar.js";
import utils from "./utils.js";
(async function ($) {

    const results = await apis.getMeData()
    const { data } = results;

    store.setMeData({
        id: data.userId,
        socketId: null,//data.socketId,
        avatar: data.avatar,
        username: data.username,
    })

    chatService.getChats()

    clientSocket.on('message', (data) => {



        const { chatId, content, messageId, sender, type } = data


        const badgeMessage = document.getElementById(`badgeMessage_${chatId}`)


        chatBodyUi.addMessage(data)

        chat_sidebar.setLastMessage(chatId, content)
        chat_sidebar.setBadgeMessage(chatId)

        if (!badgeMessage.parentNode.classList.contains('active')) {
            utils.play()
            utils.notification(`${sender.username}`, content)
        }



    })

})(jQuery);