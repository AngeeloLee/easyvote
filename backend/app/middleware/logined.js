'use strict';

module.exports = (options, app) => {
    return async (ctx, next) => {
        const token = ctx.session.token;
        // 无token
        if (!token) {
            console.log('error token:',token);
            ctx.body = ctx.helper.makeResponse({ succ: false, code: 201, msg: '用户未登录或登录失效', });
            return;
        }
        // token验证不通过
        const uid = ctx.service.code.verify(token);
        if (!uid) {
            console.log('error uid:',uid);
            ctx.body = ctx.helper.makeResponse({ succ: false, code: 201, msg: '用户未登录或登录失效', });
            return;
        }
        // 登录状态正常
        await next();
    }
}