import ChatService from '../services/chats.js'

class SearchUserUI {

    #parentList = document.getElementById('findUserResult')

    clearList() {
        this.#parentList.innerHTML = ''
    }

    addtoList(user) {
        const html = `
               <li class="list-group-item d-flex align-items-center p-l-r-0">
					<figure class="avatar avatar-sm m-r-15">
						<img src="${user.avatar}" class="rounded-circle" alt="image">
					</figure>
					<div>
						<h6 class="m-b-0 primary-font">${user.username}</h6>
						<small class="text-muted">بیو</small>
					</div>
					<button type='button' class="btn badge badge-danger ml-auto openOrGetChat" data-chatId=${user.userId}>ارسال مسیج</button>
				</li>
        
        `
        this.#parentList.innerHTML += html
        $('.openOrGetChat').on('click', function (e) {
            const chatId = e.currentTarget.dataset.chatid
            ChatService.openChat(chatId)
            // close All Modal
            $('.modal').modal('hide')
        })
    }

    noResult() {
        this.clearList()
        const html = `
               <li class="list-group-item d-flex align-items-center p-l-r-0">
                    <div>
                        <h6 class="m-b-0 primary-font">نتیجه ای یافت نشد</h6>
                    </div>
                </li>
        
        `
        this.#parentList.innerHTML += html
    }


}

export default new SearchUserUI()