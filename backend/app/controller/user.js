'use strict';

const Controller = require('egg').Controller;
const { logined, validate } = require('../decorator');

class UserController extends Controller {
  // 构造器
  constructor(ctx) {
    super(ctx);
    // 密码登录校验规则
    this.pwdLoginRule = {
      account: {
        type: 'string',
        trim: true,
        format: ctx.regexps.account,
      },
      password: {
        type: 'string',
        trim: true,
        format: ctx.regexps.password, 
      },
      remember: {
        type: 'string',
        trim: true,
        format: ctx.regexps.bool,
      },
    };
    // 验证码登录校验规则
    this.codeLoginRule = {
      contact: {
        type: 'string',
        trim: true,
        format: ctx.regexps.contact,
      },
      code: {
        type: 'string',
        trim: true,
        format: ctx.regexps.code,
      },
      remember: {
        type: 'string',
        trim: true,
        format: ctx.regexps.bool,
      },
    }
  }

  async add() {
    this.ctx.body = this.ctx.service.user.add();
  }

  // 使用密码登录
  // @validate(this.pwdLoginRule)
  async pwdLogin() {
    console.log('login')
    const { ctx, app } = this;
    const { account, password, remember } = ctx.request.body;
    const type = ctx.helper.accountType(ctx.regexps, account);
    const uid = await ctx.service.user.verify(account, type, password);
    // 密码错误
    if (!uid) {
      ctx.body = ctx.helper.makeResponse(app.responses.failLogin);
      return;
    }
    const token = await ctx.service.session.register(uid);
    // 生成token失败
    if (!token) {
      ctx.body = ctx.helper.makeResponse(app.responses.serverError);
      return;
    }
    ctx.session.token = token;
    // 延长session
    if (remember) ctx.session.maxAge = app.config.maxSessionLifetime;
    const username = await ctx.service.user.username(uid);
    ctx.body = ctx.helper.makeResponse(app.responses.succLogin, { username });
    return;
  }

  // 使用验证码登录
  // @validate(this.codeLoginRule)
  async codeLogin() {
    const { ctx, app } = this;
    const { contact, code, remember } = ctx.request.body;
    const uid = await ctx.service.code.verify(contact, code);
    // 验证码错误
    if (!uid) {
      ctx.body = ctx.helper.makeResponse(app.responses.invalidCode);
      return;
    }
    const token = await ctx.service.session.register(uid);
    // 生成token失败
    if (!token) {
      ctx.body = ctx.helper.makeResponse(app.responses.serverError);
      return;
    }
    ctx.session.token = token;
    // 延长session
    if (remember) ctx.session.maxAge = app.config.maxSessionLifetime;
    const username = await ctx.service.user.username(uid);
    ctx.body = ctx.helper.makeResponse(app.responses.succLogin, { username });
    return;
  }

  // 登出
  // @logined()
  async logout() {
    const { ctx, app } = this;
    ctx.session = null;
    ctx.body = ctx.helper.makeResponse(app.responses.succLogout);
    return;
  }

  // 注册
  async register() {
    const { ctx, app } = this;
    const { contact, password, code, createAddress } = ctx.request.body;
    // console.log('ctx:', ctx);
    console.log('contact: ', contact);
    console.log('password: ', password);
    console.log('code: ', code);
    console.log('create: ', createAddress);
    let uid = await ctx.service.code.verify(contact, code);
    // 验证码错误
    if (uid !== app.newAccountId) {
      ctx.body = ctx.helper.makeResponse(app.responses.invalidCode);
      return;
    }
    const type = ctx.helper.accountType(ctx.regexps, contact);
    uid = await ctx.service.user.register(contact, type, password);
    console.log('uid:',uid);
    // 账户已存在
    if (!uid) {
      ctx.body = ctx.helper.makeResponse(app.responses.failRegister);
      return;
    }
    // 预设注册成功
    ctx.body = ctx.helper.makeResponse(app.responses.succRegister);
    // 同时创建以太坊账户
    if (createAddress) {
      const address = await ctx.service.ethereum.createAddress(uid);
      // 创建以太坊账户失败
      if (!address) {
        ctx.body = ctx.helper.makeResponse(app.responses.succRegisterButNoAddress);
      }
    }
    return;
  }

  // 获取简要信息
  async info() {
    const { ctx, app } = this;
    const uid = await ctx.service.session.verify(ctx.session.token);
    // console.log('uid:',uid)
    const info = await ctx.service.user.getInfo(uid);
    ctx.body = ctx.helper.makeResponse(app.responses.success, info);
    return;
  }

  // 获取详细信息
  async profile() {
    const { ctx, app } = this;
    const uid = await ctx.service.session.verify(ctx.session.token);
    const profile = await ctx.service.user.getProfile(uid);
    ctx.body = ctx.helper.makeResponse(app.responses.success, profile);
    return;
  }

  // 更新个人信息
  async updateProfile() {
    const { ctx, app } = this;
    const { username, password, nickname } = ctx.request.body;
    const token = ctx.session.token;
    const uid = await ctx.service.session.verify(token);
    uid = await ctx.service.user.updateProfile(uid, username, nickname, password);
    if (!uid) {
      ctx.body = ctx.helper.makeResponse(app.responses.failUpdateProfile);
      return;
    }
    ctx.body = ctx.helper.makeResponse(app.responses.succUpdateProfile);
    return;
  }

  async updateAddress() {

  }

  // 注销用户
  async destroy() {
    const { ctx, app } = this;
    const token = ctx.session.token;
    const uid = ctx.service.code.verify(token);
    await ctx.service.user.destroy(uid);
    ctx.session.token = null;
    ctx.body = ctx.helper.makeResponse(app.responses.success);
    return;
  }
}

module.exports = UserController;