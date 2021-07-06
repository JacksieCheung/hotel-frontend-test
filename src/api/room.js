import request from '../utils/request'

// 查询客房列表
export const getRoomList = params => { return request({ url: '/user/user_room/list_room', method: 'get', headers: params }) }

export const openRoom = params => { return request({ url: '/user/user_room/open_room/'+params.pathVal, method: 'post', headers: params.cookie })}

export const bookRoom = params => { return request({ url: '/user/user_room/book_room/'+params.pathVal, method: 'post', headers: params.cookie })}

export const returnRoom = params => { return request({ url: '/user/user_room/return_room/'+params.pathVal, method: 'post', headers: params.cookie })}
