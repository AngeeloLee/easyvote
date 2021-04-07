'use strict';

module.exports = (rule) => {
    return (target, name, descriptor) => {
        const method = descriptor.value;
        const that = this;
        descriptor.value = async () => {
            const { ctx, app } = that;
            try {
                ctx.validate(rule);
                await method.apply(that);
            } catch (err) {
                ctx.error(err);
            }
        }
        return descriptor;
    }
}