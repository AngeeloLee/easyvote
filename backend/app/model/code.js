'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  /* 验证码方案 */
  const CodeSchema = new Schema({
    // 用户id
    uid: { type: String, },
    // 邮箱或手机号
    contact: { type: String, required: true, unique: true, },
    // 验证码
    code: { type: String, required: true, },
    // 频繁间隔时间
    until: { 
      type: Date, 
      default: (() => {
        const now = new Date();
        const until = new Date();
        until.setSeconds(now.getSeconds() + app.config.codeFrequenceInterval);
        return until;
      })(),
    },
    // 到期时间
    expiry: {
      type: Date, 
      default: (() => {
        const now = new Date();
        const expiry = new Date();
        expiry.setSeconds(now.getSeconds() + app.config.codeLifetime);
        return expiry;
      })(),
    },
  });
  return mongoose.model('Code', CodeSchema);
};