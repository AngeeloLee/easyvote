'use strict';

const Controller = require('egg').Controller;
const md5 = require('js-md5')
const { logined, validate } = require('../decorator');

class ContractionController extends Controller {

  /**
   * 发布合约
   * @param {String} cid 
   */
  async __publishContract(uid, cid) {
    const { ctx, app } = this;
    const doc = await ctx.service.contraction.getFull(cid);
    // 创建投票人
    let vids = [];
    for(const voter of doc.tempVoters) {
      const vid = await ctx.service.voter.create({contact:voter.contact, type:voter.type});
      vids.push(vid);
      // 创建投票人账户
      ctx.service.ethereum.createAccount(md5(voter.contact)).then(account => {
        // 更新投票人信息
        ctx.service.voter.update(vid, {...account, contract:doc._id});
        // 发送投票链接
        ctx.service.common.sendEmail(
          voter.contact, ctx.helper.ticketMailSubject, 
          ctx.helper.makeTicketMail(doc.title, app.siteDomain+'/vote/'+vid, vid, account.passcode)
        );
      });
    }
    // 更新合约信息
    await ctx.service.contraction.update(doc._id, {voters:vids, tempVoters:null});
    // 发布合约
    ctx.service.ethereum.publishContract(uid, {
      candidates: doc.candidates, 
      voters: vids, 
      open: doc.open,
      start: doc.start,
      end: doc.end,
    }).then(address => {
      // 更新合约信息
      ctx.service.contraction.update(cid, {address});
    });
  }
  
  // 创建投票
  async create() {
    const { ctx, app } = this;
    const { title, description, start, end, open, candidates, voters, publish } = ctx.request.body;
    // console.log('candidates:', candidates)
    // console.log('voters:', voters)
    const uid = await ctx.service.session.verify(ctx.session.token);
    const candis = candidates.map(val=>{return {...val,key:md5(val.name)}});
    let params = {
      title,
      description,
      start,
      end,
      open,
      candidates: candis,
    }
    if (!open) params.tempVoters = voters;
    const cid = await ctx.service.contraction.create(uid, params);
    if (!cid) {
      ctx.body = ctx.helper.makeResponse(app.responses.failCreateContract);
      return;
    };
    // 更新用户合约信息
    await ctx.service.user.addContract(uid, cid);
    // 如果不需要发布
    if (!publish) {
      ctx.body = ctx.helper.makeResponse(app.responses.succCreateContract);
      return;
    }
    this.__publishContract(uid, cid);
    ctx.body = ctx.helper.makeResponse(app.responses.succPublishContract);
    return;
  }

  // 更新投票信息
  async update() {
    const { ctx, app } = this;
    const { cid, title, description, start, end, open, candidates, voters, publish } = ctx.request.body;
    const uid = await ctx.service.session.verify(ctx.session.token);
    const candis = candidates.map(val=>{return {...val,key:md5(val.name)}});
    let params = {
      title,
      description,
      start,
      end,
      open,
      candidates: candis,
    }
    if (!open) params.tempVoters = voters;
    cid = await ctx.service.contraction.update(cid, params);
    if (!cid) {
      ctx.body = ctx.helper.makeResponse(app.responses.failed);
      return;
    };
    // 如果不需要发布
    if (!publish) {
      ctx.body = ctx.helper.makeResponse(app.responses.success);
      return;
    }
    this.__publishContract(uid, cid);
    ctx.body = ctx.helper.makeResponse(app.responses.succPublishContract);
    return;
  }

  // 发布投票
  async publish() {
    const { ctx, app } = this;
    const { cid } = ctx.request.body;
    const uid = await ctx.service.session.verify(ctx.session.token);
    await this.__publishContract(uid, cid);
    ctx.body = ctx.helper.makeResponse(app.responses.succPublishContract);
    return;
  }

  // 获取投票信息
  // TODO 删减返回信息
  async get() {
    const { ctx, app } = this;
    const { cid } = ctx.request.body
    console.log('cid:',cid)
    const doc = await ctx.service.contraction.getFull(cid)
    console.log('doc:',doc)
    if (!doc) {
      ctx.body = ctx.helper.makeResponse(app.responses.failed);
      return;
    }
    ctx.body = ctx.helper.makeResponse(app.responses.success, doc);
    return;
  }

  async detail() {}
}

module.exports = ContractionController;