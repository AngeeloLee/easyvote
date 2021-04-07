'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  /* 用户方案 */
  const UserSchema = new Schema({
    // 用户名
    username: { type: String, unique: true, },
    // 昵称
    nickname: { type: String, },
    // 手机号
    mobile: { type: String, },
    // 邮箱
    email: { type: String, },
    // 有效标记
    valid: { type: Boolean, default: true, },
    // 密码
    password: { type: String, },
    // 账户地址
    address: { type: String, },
    // 账户解密口令
    passcode: { type: String, },
    // 私钥
    privatekey: { type: String, },
    // keystore
    keystore: { type: String, },
    // 账户余额
    balance: { type: Number, },
    // 创建的合约
    contracts: [{ type: Schema.Types.ObjectId, ref: 'Contraction', }],
    // 注册日期
    registerAt: { type: Date, default: new Date() },
  });
  return mongoose.model('User', UserSchema);
};