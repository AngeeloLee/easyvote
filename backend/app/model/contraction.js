'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  /* 合约方案 */
  const ContractionSchema = new Schema({
    // 发起者
    proposer: { type: Schema.Types.ObjectId, ref: 'User', },
    // 合约地址
    address: { type: String, },
    // 是否有效
    valid: { type: Boolean, default: true },
    // 合约标题
    title: { type: String, },
    // 合约描述
    description: { type: String, },
    // 投票人
    voters: [{ type: Schema.Types.ObjectId, ref: 'Voter', }],
    // 临时投票人，投票为发布时使用
    tempVoters: [{
      contact: { type: String, },
      type: { type: String, }
    }],
    // 候选人
    candidates: [{
      key: { type: String, },
      name: { type: String, },
      description: { type: String, },
    }],
    open: { type: Boolean, default: false, },
    // 状态 READY/VOTING/DONE/ERROR
    status: { type: String, },
    // 开始时间
    startAt: {type: Date, },
    // 结束时间
    endAt: { type: Date, },
    // 创建日期
    createdAt: { type: Date, default: new Date(), },
  });
  return mongoose.model('Contraction', ContractionSchema);
}