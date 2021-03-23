'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  /* 投票人方案 */
  const VoterSchema = new Schema({
    // 投票人地址
    address: { type: String, unique: true, required: true, },
    // 有效标记
    valid: { type: Boolean, default: true, },
    // 密码
    password: { type: String, },
    // 口令
    passcode: { type: String, required: true, },
    // 参与的合约地址
    contract: { type: String, required: true, },
    // 目标
    target: { type: String, required: true, },
    // 目标类型，email 或 mobile
    targetType: { type: String, required: true, },
    // 是否已发送链接
    isSendLink: { type: Boolean, default: false, },
    // 账户余额
    balance: { type: Number, default: 0, },
  });
  return mongoose.model('Voter', VoterSchema);
}