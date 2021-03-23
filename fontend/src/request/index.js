import axios from 'axios';
import { notification } from 'ant-design-vue'

const baseURL = '/api'

const requestInterceptor = config => {
    config.headers.token = sessionStorage.getItem('token') || ''
    return config
}

const responseInterceptor = response => {
    // 获取接口返回结果
    const res = response.data;
    // code为0，直接把结果返回回去，这样前端代码就不用在获取一次data.
    if (res.code === 0) {
        return res;
    } else if (res.code === 10000) {
        // 10000假设是未登录状态码
        notification.warning({
            message: '登录失效',
            description: res.message
        });
        // 也可使用router进行跳转
        window.location.href = '/#/login';
        return res;
    } else {
        // 错误显示可在service中控制，因为某些场景我们不想要展示错误
        // Message.error(res.message);
        return res;
    }
}

axios.defaults.baseURL = baseURL
axios.interceptors.request.use(requestInterceptor)
axios.interceptors.response.use(responseInterceptor)

export default axios