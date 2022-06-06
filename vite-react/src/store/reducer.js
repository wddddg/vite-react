const defaultMessage = {
    error:``
}

export default (state=defaultMessage,action) =>{
    if(action?.payload){
        defaultMessage.error = action.payload.error
    }
    return state
}