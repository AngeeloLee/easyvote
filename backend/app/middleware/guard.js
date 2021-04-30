'use strict';

module.exports = (options, app) => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            console.log('catch error:',error);
            // 参数校验失败
            if(ctx.status == options.FAILED_VALIDATE) {
                ctx.body = ctx.helper.makeResponse(app.responses.failValidate(error));
                return;
            }
            // 其他错误，服务器内部错误
            // else {
            //     ctx.body = ctx.helper.makeResponse(app.responses.serverError);
            //     return;
            // }
        }
    }
}