class ChatSidebarUi {

    #parent = document.getElementById('chatList')

    add(chat, active = '') {
        //  const target = chat.target;


        const html = `

            <a href="#" class="list-group-item list-group-item-action d-flex ${active}" data-chatId='${chat.chatId}'>
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

        this.#parent.innerHTML += html;
    }





}


export default new ChatSidebarUi()