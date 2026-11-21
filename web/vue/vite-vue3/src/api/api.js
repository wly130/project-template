import {get, post, put, patch, del, upload} from './request.js';

/**
 * 认证相关API
 */
const authAPI = {
    // 登录
    login: (params) => post('/login', params),
    // 注册
    register: (params) => post('/register', params),
    // 刷新令牌
    refreshToken: () => post('/refreshToken', {}),
    // 登出
    logout: () => post('/logout', {}),
};

/**
 * 用户信息相关API
 */
const userAPI = {
    // 获取用户信息
    getUserInfo: () => get('/user/info'),
    // 更新用户信息
    updateUserInfo: (params) => put('/user/info', params),
    // 获取用户列表（admin）
    getUserList: (params) => get('/users', params),
    // 获取单个用户（admin）
    getUserById: (id) => get(`/users/${id}`),
    // 删除用户（admin）
    deleteUser: (id) => del(`/users/${id}`),
    // 更新用户角色（admin）
    updateUserRole: (id, params) => patch(`/users/${id}/role`, params),
};

/**
 * 文件上传相关API
 */
const fileAPI = {
    // 上传头像
    uploadAvatar: (formData) => upload('/upload/avatar', formData),
    // 上传文件
    uploadFile: (formData) => upload('/upload/file', formData),
    // 删除文件
    deleteFile: (fileId) => del(`/files/${fileId}`),
};

/**
 * 数据相关API（可以根据实际业务扩展）
 */
const dataAPI = {
    // 获取某类型数据列表
    getList: (type, params) => get(`/data/${type}`, params),
    // 获取单条数据详情
    getDetail: (type, id) => get(`/data/${type}/${id}`),
    // 创建数据
    create: (type, params) => post(`/data/${type}`, params),
    // 更新数据
    update: (type, id, params) => put(`/data/${type}/${id}`, params),
    // 删除数据
    delete: (type, id) => del(`/data/${type}/${id}`),
};

/**
 * 统一导出API
 * 使用示例：
 * import api from './api/api.js'
 * api.auth.login({ username: 'admin', password: '123456' })
 * api.user.getUserInfo()
 * api.file.uploadAvatar(formData)
 */
export default {
    auth: authAPI,
    user: userAPI,
    file: fileAPI,
    data: dataAPI,
};
