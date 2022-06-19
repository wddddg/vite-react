const defaultMessage = {
    error: ``,
    changeAvatar: ''
}

export default (state = defaultMessage, action = {}) => {
    if (action?.payload) {
        defaultMessage.error = action.payload.error
        defaultMessage.changeAvatar = action.payload.changeAvatar
    }
    return state
}