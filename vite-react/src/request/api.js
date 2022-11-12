import request from './request'

export const getLists = (params) => request.get('/chak', params)

export const login = (params) => {
	return request.post('/login', params)
}

export const register = (params) => {
	return request.post('/register', params)
}

export const queryText = (params) => {
	return request.get(params ? `/queryText?userId=${params}` : '/queryText')
}

export const addText = (params) => {
	return request.post('/addText', params)
}

export const updataText = (params) => {
	return request.post('/updataText', params)
}

export const delText = (params) => {
	return request.post('/delText', params)
}

export const queryAllUser = () => {
	return request.get('/queryAllUser')
}

export const delUser = (params) => {
	return request.post('/delUser', params)
}

export const setAdmin = (params) => {
	return request.post('/setAdmin', params)
}

export const updataAdminPassword = (params) => {
	return request.post('/updataAdminPassword', params)
}

export const uploadsAvatar = (params) => {
	return request.post('/uploadsAvatar', params)
}

export const queryUser = (params) => {
	return request.post('/queryUser', params)
}

export const queryAllLength = () => {
	return request.get('/queryAllLength')
}