/**
 * API 使用示例
 * 这个文件展示了如何在Vue组件中使用优化后的API
 */

// ============================================================================
// 示例1：认证相关
// ============================================================================
export async function authExample() {
    // 假设你有 this.$api 可用（在Vue组件中）

    // 登录
    const loginResult = await this.$api.auth.login({
        username: 'admin',
        password: '123456',
    });
    console.log('登录成功:', loginResult);

    // 注册
    const registerResult = await this.$api.auth.register({
        username: 'newuser',
        password: 'password123',
        email: 'user@example.com',
    });
    console.log('注册成功:', registerResult);

    // 登出
    await this.$api.auth.logout();
}

// ============================================================================
// 示例2：用户信息相关
// ============================================================================
export async function userExample() {
    // 获取当前用户信息
    const userInfo = await this.$api.user.getUserInfo();
    console.log('用户信息:', userInfo);

    // 更新用户信息
    const updateResult = await this.$api.user.updateUserInfo({
        username: 'newname',
        email: 'newemail@example.com',
        age: 25,
    });
    console.log('更新成功:', updateResult);

    // 以下���管理员操作

    // 获取用户列表
    const userList = await this.$api.user.getUserList({
        page: 1,
        pageSize: 10,
        search: 'admin',
    });
    console.log('用户列表:', userList);

    // 获取单个用户信息
    const singleUser = await this.$api.user.getUserById(123);
    console.log('单个用户:', singleUser);

    // 更新用户角色
    await this.$api.user.updateUserRole(123, {
        role: 'admin',
    });

    // 删除用户
    await this.$api.user.deleteUser(123);
}

// ============================================================================
// 示例3：文件上传
// ============================================================================
export async function fileExample(file) {
    // 上传头像
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'avatar');

    const uploadResult = await this.$api.file.uploadAvatar(formData);
    console.log('头像上传成功:', uploadResult);

    // 上传其他文件
    const fileFormData = new FormData();
    fileFormData.append('file', file);
    fileFormData.append('category', 'documents');

    const fileUploadResult = await this.$api.file.uploadFile(fileFormData);
    console.log('文件上传成功:', fileUploadResult);

    // 删除文件
    await this.$api.file.deleteFile(fileUploadResult.fileId);
}

// ============================================================================
// 示例4：通用数据操作（CRUD）
// ============================================================================
export async function dataExample() {
    // 获取数据列表
    const list = await this.$api.data.getList('users', {
        page: 1,
        pageSize: 20,
        sort: 'createdAt',
    });
    console.log('数据列表:', list);

    // 获取单条数据详情
    const detail = await this.$api.data.getDetail('users', 123);
    console.log('数据详情:', detail);

    // 创建新数据
    const createResult = await this.$api.data.create('users', {
        username: 'newuser',
        email: 'new@example.com',
        status: 'active',
    });
    console.log('创建成功:', createResult);

    // 更新数据
    const updateResult = await this.$api.data.update('users', 123, {
        username: 'updateduser',
        status: 'inactive',
    });
    console.log('更新成功:', updateResult);

    // 删除数据
    await this.$api.data.delete('users', 123);
}

// ============================================================================
// 示例5：Vue组件中的完整使用
// ============================================================================
export const VueComponentExample = {
    template: `
        <div>
            <button @click="handleLogin">登录</button>
            <button @click="handleGetUserInfo">获取用户信息</button>
            <button @click="handleUpload">上传文件</button>
        </div>
    `,

    data() {
        return {
            loading: false,
            userInfo: null,
            error: null,
        };
    },

    methods: {
        async handleLogin() {
            this.loading = true;
            this.error = null;
            try {
                const response = await this.$api.auth.login({
                    username: 'admin',
                    password: '123456',
                });
                console.log('登录成功');
                // 保存token（request.js会自动处理）
                localStorage.setItem('accessToken', response.token);
            } catch (error) {
                this.error = '登录失败: ' + error.message;
            } finally {
                this.loading = false;
            }
        },

        async handleGetUserInfo() {
            this.loading = true;
            this.error = null;
            try {
                this.userInfo = await this.$api.user.getUserInfo();
            } catch (error) {
                this.error = '获取用户信息失败: ' + error.message;
            } finally {
                this.loading = false;
            }
        },

        async handleUpload() {
            // 获取文件输入
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = async (e) => {
                const file = e.target.files[0];
                if (!file) return;

                this.loading = true;
                this.error = null;
                try {
                    const formData = new FormData();
                    formData.append('file', file);
                    const result = await this.$api.file.uploadAvatar(formData);
                    console.log('上传成功:', result);
                } catch (error) {
                    this.error = '上传失败: ' + error.message;
                } finally {
                    this.loading = false;
                }
            };
            input.click();
        },
    },
};

// ============================================================================
// 示例6：错误处理
// ============================================================================
export async function errorHandlingExample() {
    try {
        const data = await this.$api.user.getUserInfo();
        console.log('成功:', data);
    } catch (error) {
        if (error.status === 401) {
            console.error('未授权 - 将自动刷新token重试');
        } else if (error.status === 403) {
            console.error('禁止访问 - 将自动跳转到登录页');
        } else if (error.status === 404) {
            console.error('资源不存在');
        } else if (error.status === 500) {
            console.error('服务器错误');
        } else {
            console.error('请求失败:', error.message);
        }
    }
}

// ============================================================================
// 示例7：使用不同的HTTP方法
// ============================================================================
export async function httpMethodsExample() {
    // 使用request.js中导出的方法
    import {get, post, put, patch, del, upload} from './request.js';

    // GET
    const getResult = get('/users', {page: 1});

    // POST
    const postResult = post('/users', {name: 'John'});

    // PUT（完全替换）
    const putResult = put('/users/123', {name: 'Jane', age: 30});

    // PATCH（部分更新）
    const patchResult = patch('/users/123', {age: 31});

    // DELETE
    const delResult = del('/users/123');

    // UPLOAD
    const formData = new FormData();
    formData.append('file', file);
    const uploadResult = upload('/upload/file', formData);
}
