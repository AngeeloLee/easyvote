'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  /* 合约方案 */
  const ContractSchema = new Schema({
    // 合约地址
    address: { type: String, unique: true, required: true, },
    // 是否有效
    valid: { type: Boolean, default: true },
    // 合约描述
    description: { type: String, },
    // 投票人
    voters: [{ type: Schema.Types.ObjectId, ref: 'Voter', }],
    // 候选人
    candidates: [{
      key: { type: String, },
      name: { type: String, },
      description: { type: String, },
    }],
    // 有效日期
    expireAt: { type: Date, required: true, },
    // 创建日期
    createdAt: { type: Date, default: Date.now, },
  });
  return mongoose.model('Contract', ContractSchema);
}