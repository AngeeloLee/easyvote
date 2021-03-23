'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  /* 会话方案 */
  const SessionSchema = new Schema({
    // 用户ID
    uid: { type: Schema.Types.ObjectId, ref: 'User', },
    // token
    token: { type: String, required: true, },
    // 有效位
    valid: { type: Boolean, default: true, },
    // 失效时间
    expireAt: {
        type: Date, 
        default: function() {
            const now = new Date();
            const expire = new Date();
            expire.setMinutes(now.getMinutes() + app.config.sessionLifetime);
            return expire;
        },
    },
  });
  return mongoose.model('Session', SessionSchema);
};