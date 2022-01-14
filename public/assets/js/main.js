import apis from "./apis.js";
import * as store from './store.js'
(async function ($) {

    const results = await apis.getMeData()
    const { data } = results;

    store.setMeData({
        id: data.userId,
        socketId: null,//data.socketId,
        avatar: data.avatar,
        username: data.username,
    })

})(jQuery);