import request from './request'

export const getLists = () => request.get('/chak')

export const queryText = () => {
	return request.get('/queryText')
}

export const addText = (params) => {
	return request.post('/addText',params)
}

export const updataText = (params) => {
	return request.post('/updataText',params)
}

export const delText = (params) => {
	return request.post('/delText',params)
}

export const queryAllUser = () => {
	return request.get('/queryAllUser')	
}

export const queryUser = (params) => {
	return request.post('/queryUser',params)
}