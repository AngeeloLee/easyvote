'use strict';

const Controller = require('egg').Controller;

class CommonController extends Controller {
    // 发送验证码
    async sendCode() {
        const { ctx, app } = this;
        const { contact } = ctx.request.body;
        const type = ctx.helper.accountType(ctx.regexps, contact);
        const uid = await ctx.service.user.exist(contact, type);
        let code = ctx.helper.makeCode();
        code = await ctx.service.code.register(uid || app.newAccountId, contact, code);
        // 生成验证码失败
        if (!code) {
            ctx.body = ctx.helper.makeResponse(app.responses.success);
            return;
        }
        // 使用邮箱发送
        if (type === 'email') {
            const info = await ctx.service.common.sendEmail(contact, ctx.helper.codeMailSubject, ctx.helper.makeCodeMail(code));
            if (info) {
                ctx.body = ctx.helper.makeResponse(app.responses.success);
            } else {
                ctx.body = ctx.helper.makeResponse(app.responses.failed);
            }
            return;
        }
        // 使用短信发送
        else if (type === 'mobile') {
            const info = await ctx.service.common.sendSms();
        }
        ctx.body = ctx.helper.makeResponse(app.responses.failed);
        return;
    }

    // 发送选票
    async sendTicket() {}
}

module.exports = CommonController;