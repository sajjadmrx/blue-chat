class chatBodyUi {

	#parent = document.getElementById('chat-body')

	close() {
		this.#parent.classList.add('hide')
	}


	open(chat, messages = []) {
		// this.#parent.classList.remove('hide')
		this.#parent.innerHTML = ''
		let html = '';
		html += this.#getHeader(chat)
		html += this.#getChatBody(messages)
		html += this.#getFooter(chat)
		this.#parent.innerHTML = html

	}


	#getHeader(chatInput) {
		let chat = chatInput

		const html = `
                    <div class="chat-body-header">
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
							<span class="small text-success">در حال نوشتن ...</span>
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
					</div>
        `;


		return html;

	}

	#getFooter(chat) {
		return `
        
            <div class="chat-body-footer">
				<form class="d-flex align-items-center">
					<input type="text" class="form-control" placeholder="پیام ...">
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
			</div>
        
        `
	}

	#getChatBody(messages) {

		if (messages.length === 0)
			return this.#noMessage();

	}

	#addMessage(message) { }


	#noMessage() {
		return `
		<div class="chat-body-messages" tabindex="6" style="overflow: hidden; outline: none;">
						<div class="message-items">
							
							
							
							
							
							
							
							
							
							
							
							
							
							
							<div class="message-item message-item-date-border">
								<span class="badge">
									<i class="fa fa-calendar"></i>
	سلام کنید
								</span>
							</div>
							
							
							
						</div>
					</div>
		
		
		`;

	}

	#hasMessage() {
		const me = ` `;
		const other = ` `;
		const system = ` `;
	}


}

export default new chatBodyUi();