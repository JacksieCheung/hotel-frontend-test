import request from '../utils/request'
// 登录
export const login = params => { return request({ url: '/login', method: 'post', data: params }) }
