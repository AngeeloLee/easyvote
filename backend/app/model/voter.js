'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  /* 投票人方案 */
  const VoterSchema = new Schema({
    // 投票人地址
    address: { type: String, unique: true, },
    // 有效标记
    valid: { type: Boolean, default: true, },
    // 私钥
    privatekey: { type: String, },
    // 口令
    passcode: { type: String, },
    // 参与的合约地址
    contract: { type: String, },
    // 联系方式
    contact: { type: String, required: true, },
    // 联系方式类型，EMAIL 或 MOBILE
    type: { type: String, required: true, },
    // 是否已发送链接
    isSendLink: { type: Boolean, default: false, },
    // 账户余额
    balance: { type: Number, default: 0, },
  });
  return mongoose.model('Voter', VoterSchema);
}