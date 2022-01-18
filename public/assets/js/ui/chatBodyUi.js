import ChatService from '../services/chats.js'
import * as store from '../store.js'
import clientSocket from '../socket.js'
let messageType = {
	member_chat: 0,
	new_member: 1,
	left_member: 2,
	kicked_member: 3,
	pinned_message: 4,

}
class chatBodyUi {

	#parent = document.getElementById('chat-body')

	close() {
		this.#parent.innerHTML = ''
		// remove header
		$('#chat-header').remove();
		// remove footer
		$('#chat-footer').remove();
	}


	open(chat, messages = []) {
		this.close();
		this.#parent.innerHTML = ''
		let html = '';
		//	html += this.#getHeader(chat)
		this.#parent.before(this.#getHeader(chat))
		html += this.#getChatBody(messages, chat)
		// html += this.#getFooter(chat)
		this.#parent.after(this.#getFooter(chat))

		this.#parent.innerHTML = html
		this.#messages(messages)


		$('#form_message').on('submit', function (e) {
			e.preventDefault();
			let data = {};
			// each form
			$(this).find('input, textarea, select').each(function () {
				data[this.name] = $(this).val();
			})
			const content = data.message_content;
			const chatId = data.chatId;
			if (content.length < 0) {
				return;
			}


			ChatService.sendMessage(chatId, content)

			this.reset();
		})


		// typeing event
		$('#message_content').on('keyup', function (e) {
			const content = $(this).val();
			const chatId = $('#chatId').val();
			if (content.length < 0) {
				return;
			}
			setTimeout(() => {
				clientSocket.emit('typing', { chatId: chatId, content: content })
			}, 1000);

		})

		clientSocket.on('typing', (data) => {
			const username = data.username
			//	if (chatId == chat.chatId) {
			$('.typeing-status').html(
				`${username}, در حال نوشتن...`
			)
			//}
			setTimeout(() => { $('.typeing-status').html('') }, 1000);
		})


	}


	addMessage(message) {
		const chatId = message.chatId;
		const content = message.content;
		const type = message.type;
		const sender = message.sender;

		if (type == messageType.member_chat) {
			this.#addMemberChat(message);
		}
		else if (type == messageType.new_member) {

		}

	}


	#getHeader(chatInput) {
		let chat = chatInput
		const div = document.createElement('div');
		div.classList.add('chat-body-header');
		div.id = 'chat-header'
		div.innerHTML = `
                
						<a href="#" class="btn btn-dark opacity-3 m-r-10 btn-chat-sidebar-open">
							<i class="ti-menu"></i>
						</a>
						<div>
							<figure class="avatar avatar-sm m-r-10">
								<img src="${chat.avatar}" class="rounded-circle" alt="image">
							</figure>
						</div>
						<div>
							<h6 class="mb-1 primary-font line-height-18">${chat.name}</h6>
							<span class="small text-success typeing-status" ></span>
						</div>
						<div class="ml-auto d-flex">
							<button type="button" class="ml-2 btn btn-sm btn-success btn-floating">
								<i class="fa fa-video-camera"></i>
							</button>
							<div class="dropdown ml-2">
								<button type="button" data-toggle="dropdown" class="btn btn-sm  btn-warning btn-floating">
									<i class="fa fa-cog"></i>
								</button>
								<div class="dropdown-menu dropdown-menu-right">
									<div class="dropdown-menu-body" tabindex="3" style="overflow: hidden; outline: none;">
										<ul>
											<li>
												<a class="dropdown-item" href="#">پروفایل</a>
											</li>
											<li>
												<a class="dropdown-item" href="#">مسدود کردن</a>
											</li>
											<li>
												<a class="dropdown-item" href="#">حذف</a>
											</li>
										</ul>
									</div>
								<div id="ascrail2002" class="nicescroll-rails nicescroll-rails-vr" style="width: 8px; z-index: 1000; cursor: default; position: absolute; top: 0px; left: 0px; height: 0px; display: none;"><div class="nicescroll-cursors" style="position: relative; top: 0px; float: right; width: 6px; height: 0px; background-color: rgb(66, 66, 66); border: 1px solid rgb(255, 255, 255); background-clip: padding-box; border-radius: 5px;"></div></div><div id="ascrail2002-hr" class="nicescroll-rails nicescroll-rails-hr" style="height: 8px; z-index: 1000; top: -8px; left: 0px; position: absolute; cursor: default; display: none;"><div class="nicescroll-cursors" style="position: absolute; top: 0px; height: 6px; width: 0px; background-color: rgb(66, 66, 66); border: 1px solid rgb(255, 255, 255); background-clip: padding-box; border-radius: 5px;"></div></div></div>
							</div>
						</div>
				 
        `;


		return div;

	}

	#getFooter(chat) {
		const div = document.createElement('div');
		div.id = 'chat-footer'
		div.classList.add('chat-body-footer')
		div.innerHTML = ` 
        
          
				<form class="d-flex align-items-center" id='form_message'>
					<input type="text" class="form-control" placeholder="پیام ..." name='message_content' id='message_content'>
					<input type="hidden" class="form-control"  value='${chat.chatId}' name='chatId'>
					<div class="d-flex">
						<button type="button" class="ml-3 btn btn-primary btn-floating">
							<i class="fa fa-send"></i>
						</button>
						<div class="dropup">
							<button type="button" data-toggle="dropdown" class="ml-3 btn btn-success btn-floating">
								<i class="fa fa-plus"></i>
							</button>
							<div class="dropdown-menu dropdown-menu-right">
								<div class="dropdown-menu-body" tabindex="4" style="overflow: hidden; outline: none;">
									<ul>
										<li>
											<a class="dropdown-item" href="#">
												<i class="icon fa fa-picture-o"></i> تصویر
											</a>
										</li>
										<li>
											<a class="dropdown-item" href="#">
												<i class="icon fa fa-video-camera"></i> ویدئو
											</a>
										</li>
									</ul>
								</div>
							<div id="ascrail2003" class="nicescroll-rails nicescroll-rails-vr" style="width: 8px; z-index: 1000; cursor: default; position: absolute; top: 0px; left: 0px; height: 0px; display: none;"><div class="nicescroll-cursors" style="position: relative; top: 0px; float: right; width: 6px; height: 0px; background-color: rgb(66, 66, 66); border: 1px solid rgb(255, 255, 255); background-clip: padding-box; border-radius: 5px;"></div></div><div id="ascrail2003-hr" class="nicescroll-rails nicescroll-rails-hr" style="height: 8px; z-index: 1000; top: -8px; left: 0px; position: absolute; cursor: default; display: none;"><div class="nicescroll-cursors" style="position: absolute; top: 0px; height: 6px; width: 0px; background-color: rgb(66, 66, 66); border: 1px solid rgb(255, 255, 255); background-clip: padding-box; border-radius: 5px;"></div></div></div>
						</div>
					</div>
				</form>
		 
        
        `;
		return div;
	}

	#getChatBody(messages, chat) {

		return `
					<input type="hidden" id="chatId" value="${chat.chatId}">
						<div class="message-items" id='message_items'>
							
							
						
							
							
							
						</div>
				
		`


	}

	#messages(messages) {

		if (messages.length > 0) {


			messages.map(message => {
				this.addMessage(message);
			});

		}
		else {
			this.#noMessage()

		}

	}

	#addMemberChat(message) {
		const myId = store.getMyId()
		const chatId = message.chatId;
		const senderId = message.sender.userId;
		if (senderId == myId) {

			$('#message_items').append(this.#getMeContent(message));
		}
		else {
			$('#message_items').append(this.#getOtherContent(message));
		}

		$('#chat-body').scrollTop($('#chat-body')[0].scrollHeight);
	}



	#getMeContent(message) {
		return `
			<div class="message-item" id='${message.messageId}'>
						${message.content}
			 </div>
		
		`
	}

	#getOtherContent(message) {
		return `
 
				<div class="message-item outgoing-message" id='${message.messageId}'>
				${message.content}
					<small class="message-item-date text-muted">22.30</small>
				</div>
	`

	}

	#noMessage() {
		const html = `
			 <div class="message-item message-item-date-border">
								<span class="badge">
									<i class="fa fa-calendar"></i>
	                    سلام کنید
								</span>
			 </div>
		`;
		$('#message_items').html(html);

	}


}

export default new chatBodyUi();