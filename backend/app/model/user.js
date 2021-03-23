'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  /* 用户方案 */
  const UserSchema = new Schema({
    // 用户名
    userName: { type: String, unique: true, required: true, },
    // 有效标记
    valid: { type: Boolean, default: true, },
    // 密码
    password: { type: String, },
    // 地址
    address: { type: String, },
    // 口令
    passcode: { type: String, },
    // 账户余额
    balance: { type: Number, },
    // 手机号
    mobile: { type: String, },
    // 邮箱
    email: { type: String, },
    // 创建的合约
    contracts: [{ type: Schema.Types.ObjectId, ref: 'Contract', }],
    // 注册日期
    registerAt: { type: Date, default: Date.now },
  });
  return mongoose.model('User', UserSchema);
};