import ChatService from '../services/chats.js'
import * as store from '../store.js'
class ChatSidebarUi {

    #parent = document.getElementById('chatList')

    add(chat, active = '') {
        //  const target = chat.target;


        const html = `

            <a href="#" id='chat_sider_${chat.chatId}' class="list-group-item list-group-item-action d-flex ${active} chatSider" data-chatId='${chat.chatId}'>
								<div class="flex-shrink-0">
									<figure class="avatar avatar-sm">
										<span class="avatar-title bg-danger rounded-circle">
                                            <img src="${chat.avatar}" class="rounded-circle" alt="image" style="width: inherit;">
                                        </span>
									</figure>
								</div>
								<div>
									<h6 class="mb-0">
                                        ${chat.name}
                                    </h6>
									<p class="m-0 small text-muted">
                                        ${chat.lastMassage || "اولین پیغام را بفرستید"}
                                    </p>
								</div>
			</a>
        
        `;

        // find the chat
        const chatElement = this.#parent.querySelector(`[data-chatId='${chat.chatId}']`);
        if (chatElement) {
            if (active) {
                chatElement.classList.add(active)
            }
        }
        else {
            this.#parent.innerHTML += html;
        }

        $('.chatSider').on('click', function (e) {
            e.preventDefault();
            const chatId = $(this).data('chatid');
            ChatService.openChat(chatId);
        });
    }





}


export default new ChatSidebarUi()