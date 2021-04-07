'use strict';

const Service = require('egg').Service;
class CodeService extends Service {
  /**
   * 注册或更新验证码
   * @param {string} uid 用户id
   * @param {string} contact 联系方式
   * @param {string} code 验证码
   * @returns code 验证码
   */
  async register(uid, contact, code) {
    try {
      const { ctx, app } = this;
      const Schema = app.mongoose.Schema;
      const ext = await ctx.model.Code.exists({ contact });
      if (ext) {
        const now = new Date();
        const expiry = new Date();
        expiry.setSeconds(now.getSeconds() + app.config.codeLifetime);
        await ctx.model.Code.findOneAndUpdate({ contact }, {
          code,
          expiry,
        }).exec();
      } else {
        await ctx.model.Code.create({ uid, contact, code });
      }
      return code;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  /**
   * 校验验证码
   * @param {string} contact 联系方式
   * @param {string} code 验证码
   * @returns uid 用户id
   */
  async verify(contact, code) {
    try {
      const { ctx, app } = this;
      let uid = null;
      const doc = await ctx.model.Code.findOne({ 
        contact, 
        code, 
        expiry: { $gte: new Date() },
      }).exec();
      if (doc) {
        console.log('doc: ', doc);
        uid = doc.uid;
      }
      return uid;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }
}
module.exports = CodeService;