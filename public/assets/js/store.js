let meData = {
    id: null,
    socketId: null,
    avatar: null,
    username: null,
}

export const setMeData = (data) => {
    meData = {
        ...data,
    }
}

export const setMySocketId = (socketId) => {
    meData = {
        ...meData,
        socketId,
    }
}
export const getMeData = () => {
    return meData;
}
export const getMyId = () => {
    return meData.id;
}