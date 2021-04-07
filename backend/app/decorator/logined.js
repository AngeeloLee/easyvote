'use strict';

module.exports = (target, name, descriptor) => {
    const method = descriptor.value;
    const that = this;
    descriptor.value = async () => {
        const { ctx, app } = that;
        const token = ctx.session.token;
        if (!token) {
            ctx.body = ctx.helper.makeResponse(...app.responses.invalidToken);
            return;
        }
        const uid = await ctx.service.session.verify(token);
        if (!uid) {
            ctx.body = ctx.helper.makeResponse(...app.responses.invalidToken);
            return;
        }
        await method.apply(that);
    }
    return descriptor;
}