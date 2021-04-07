'use strict';

const Service = require('egg').Service;
class ContractionService extends Service {

  /**
   * 创建一个投票
   * @param {String} proposer 
   * @param {String} address 
   * @param {String} title 
   * @param {String} description 
   * @param {Array[String]} voters 
   * @param {Array[Object]} candidates 
   * @param {String} status 
   * @param {Date} startAt 
   * @param {Date} endAt 
   * @returns {String/null}
   */
  async create(proposer, {address, title, description, tempVoters, voters, candidates, start:startAt, end:endAt, open}) {
    try {
      const { ctx, app } = this;
      let params = {
        proposer,
        title,
        description,
        candidates,
        status: 'READY',
        startAt,
        endAt,
        open,
      }
      if (address) params.address = address
      if (!open) {
        params.tempVoters = tempVoters
        params.voters = voters
      }
      const doc = await ctx.model.Contraction.create(params)
      return doc ? doc._id : null;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  /**
   * 修改合约状态
   * @param {String} cid 
   * @param {String} status 
   * @returns {String/null}
   */
  async change(cid, status) {
    try {
      const { ctx, app } = this;
      const doc = await ctx.model.Contraction.findByIdAndUpdate(cid, {status})
      return doc ? doc._id : null;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  /**
   * 更新合约
   * @param {String} cid 
   * @param {Object} update 
   * @returns 
   */
  async update(cid, {address, title, description, tempVoters, voters, candidates, startAt, endAt, open}) {
    try {
      const { ctx, app } = this;
      let doc = await ctx.model.Contraction.findOne({_id:cid, valid:true, status:'READY'})
      if (!doc) return null
      let params = {}
      if (address) params.address = address
      if (title) params.title = title
      if (description) params.description = description
      if (tempVoters) params.tempVoters = tempVoters
      if (voters) params.voters = voters
      if (candidates) params.candidates = candidates
      if (startAt) params.startAt = startAt
      if (endAt) params.endAt = endAt
      if (open) params.open = open
      doc = await ctx.model.Contraction.findByIdAndUpdate(cid, params)
      return doc ? doc._id : null;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  async getBrief() {}

  async getDetail() {}

  async getFull(cid) {
    try {
      const { ctx, app } = this;
      const doc = await ctx.model.Contraction.findById(cid)
      return doc;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  async destroy(cid) {
    try {
      const { ctx, app } = this;
      const doc = await ctx.model.Contraction.findByIdAndUpdate(cid, {valid:false})
      return doc ? doc._id : null;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }
}
module.exports = ContractionService;