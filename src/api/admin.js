import request from '../utils/request'


export const createRoomType = params => {
    return request({
        url: '/admin/room_type',
        method: 'post',
        headers: params.cookie,
        data: params.data })
}

export const createRoom = params => {
    return request({
        url: '/admin/room_num',
        method: 'post',
        headers: params.cookie,
        data: params.data })
}

export const createUserCost = params => {
    return request({
        url: '/admin/user_cost',
        method: 'post',
        headers: params.cookie,
        data: params.data })
}

export const updateVip = params => {
    return request({
        url: '/admin/user_vip',
        method: 'put',
        headers: params.cookie,
        data: params.data })
}

export const listUsers = params => {
    return request({
        url: '/admin/list_user',
        method: 'get',
        headers: params })
}

export const listRoomType = params => {
    return request({
        url: '/admin/list_room_type',
        method: 'get',
        headers: params })
}
