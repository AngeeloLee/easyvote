'use strict';

const Service = require('egg').Service;
class VoterService extends Service {

  /**
   * 验证投票人
   * @param {String} vid 
   * @param {String} passcode 
   * @returns 
   */
  async verify(vid, passcode) {
    try {
      const { ctx, app } = this;
      const doc = await ctx.model.Voter.findOne({_id:vid, passcode, valid:true, isSendLink:true, });
      return doc || null;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  /**
   * 创建一个投票人
   * @param {String} address 
   * @param {String} privatekey 
   * @param {String} passcode 
   * @param {String} contract 
   * @param {String} contact 
   * @param {String} type 
   * @returns 
   */
  async create({address, privatekey, passcode, contract, contact, type}) {
    try {
      const { ctx, app } = this;
      let params = {contact, type};
      if(address) params.address = address;
      if(privatekey) params.privatekey = privatekey;
      if(passcode) params.passcode = passcode;
      if(contract) params.contract = contract;
      const doc = await ctx.model.Voter.create(params)
      return doc._id || null;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  /**
   * 更新投票人信息
   * @param {String}} vid 
   * @param {Object} param1 
   * @returns 
   */
  async update(vid, {address, privatekey, passcode, contract, isSendLink, balance}) {
    try {
      const { ctx, app } = this;
      let params = {};
      if(address) params.address = address;
      if(privatekey) params.privatekey = privatekey;
      if(passcode) params.passcode = passcode;
      if(contract) params.contract = contract;
      if(isSendLink) params.isSendLink = isSendLink;
      if(balance) params.balance = balance;
      const doc = await ctx.model.Voter.findByIdAndUpdate(vid, params);
      return doc._id || null;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  /**
   * 销毁投票人
   * @param {String} vid 
   * @returns 
   */
  async destroy(vid) {
    try {
      const { ctx, app } = this;
      const doc = await ctx.model.Voter.findByIdAndUpdate(vid, {valid:false})
      return doc._id || null
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }
}
module.exports = VoterService;