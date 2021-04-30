module.exports = {
    siteDomain: 'http://localhost:3000/#',
    // 新用户标记
    newAccountId: 'NEW_ACCOUNT_ID',
    // 响应参数
    responses: {
        // 基础
        success: { succ: true, code: 100, msg: '请求成功', },
        failed: { succ: false, code: 200, msg: '请求失败', },
        // 参数校验不通过
        failValidate: (message) => { return { succ: false, code: 200, msg: '请求失败: '+message, }; },
        // 用户信息无效
        invalidToken: { succ: false, code: 201, msg: '用户未登录或登录失效', },
        invalidCode: { succ: false, code: 202, msg: '验证码错误', },
        // 登录注册相关
        succRegister: { succ: true, code: 110, msg: '注册成功', },
        failRegister: { succ: false, code: 210, msg: '账户已存在', },
        succLogin: { succ: true, code: 111, msg: '登录成功', },
        failLogin: { succ: false, code: 211, msg: '账户密码或验证码不正确', },
        succLogout: { succ: true, code: 112, msg: '登出成功', },
        failLogout: { succ: false, code: 212, msg: '账户未登录', },
        succSendCode: { succ: true, code: 113, msg: '验证码发送成功', },
        failSendCode: { succ: false, code: 213, msg: '验证码发送失败', },
        // 用户操作相关
        succUpdateProfile: { succ: true, code: 121, msg: '修改成功', },
        failUpdateProfile: { succ: false, code: 221, msg: '用户名已被占用', },
        succCreateContract: { succ: true, code: 122, msg: '投票创建成功', },
        failCreateContract: { succ: false, code: 222, msg: '投票创建失败', },
        succPublishContract: { succ: true, code: 123, msg: '投票发布成功', },
        failPublishContract: { succ: false, code: 223, msg: '投票发布失败', },
        // 以太坊操作相关
        succRegisterButNoAddress: { succ: true, code: 300, msg: '注册成功但创建以太坊账户失败' },
        // 服务器相关
        serverError: { succ: false, code: 400, msg: '服务器错误', },
    },
};