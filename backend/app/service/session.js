'use strict';

const Service = require('egg').Service;
class SeesionService extends Service {
  /**
   * 创建或更新token
   * @param {string} uid 用户id
   * @returns token
   */
  async register(uid) {
    try {
      const { ctx, app } = this;
      const token = ctx.helper.makeToken(uid);
      const doc = await ctx.model.Session.findOne({ uid }).exec();
      if (doc) {
        await ctx.model.Session.findByIdAndUpdate(doc._id, { token });
      } else {
        await ctx.model.Session.create({
          uid,
          token
        });
      };
      return token;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  /**
   * 验证token
   * @param {string} token token
   * @returns uid 用户id
   */
  async verify(token) {
    try {
      const { ctx, app } = this;
      let uid = null;
      const doc = await ctx.model.Session.findOne({ token }).exec();
      if (doc) {
        uid = doc.uid;
      }
      return uid;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }
}
module.exports = SeesionService;