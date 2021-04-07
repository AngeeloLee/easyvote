'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  /* 会话方案 */
  const SessionSchema = new Schema({
    // 用户ID
    uid: { type: Schema.Types.ObjectId, ref: 'User', },
    // token
    token: { type: String, unique: true, },
    // 到期时间
    // expiry: {
    //   type: Date, 
    //   default: (() => {
    //     const now = new Date();
    //     const expiry = new Date();
    //     expiry.setSeconds(now.getSeconds() + app.config.sessionLifetime);
    //     return expiry;
    //   })(),
    // },
  });
  return mongoose.model('Session', SessionSchema);
};