
import Apis from '../apis.js'
import chatBodyUi from '../ui/chatBodyUi.js'
import chat_sidebar from '../ui/chat_sidebar.js'
import * as store from '../store.js'
class ChatService {




    async openChat(chatId) {
        const results = await Apis.getChatWithId(chatId)
        let { data } = results

        const myId = store.getMyId()


        if (!data.isGroup) {
            data.user = data.users.filter(user => user.userId != myId)[0]
        }


        if (!data.isGroup) {
            data.name = data.user.username // user
            data.avatar = data.user.avatar // user
        }

        chatBodyUi.open(data)
        chat_sidebar.add(data, 'active')
    }


}


export default new ChatService()