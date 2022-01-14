
import searchService from './services/search.js'
import searchUserUi from './ui/searchUserUi.js';
(function ($) {

    document.getElementById('input-find-user')
        .addEventListener('keyup', async (e) => {
            const value = e.target.value;
            if (value.length > 2) {

                try {
                    const users = await searchService.user(value)
                    if (users.length > 0) {
                        searchUserUi.clearList()
                        users.forEach(user => {
                            searchUserUi.addtoList(user)
                        })
                    }
                    else {
                        // auto clear list
                        searchUserUi.noResult()
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            else {
                searchUserUi.clearList()
            }
        })




})(jQuery)