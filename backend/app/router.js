'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const logined = app.middleware.logined();

  /**
   * 主页
   */
  router.get('/', controller.home.index);

  /************************ 用户操作 */
  /**
   * 密码登录
   * @request account - 账户 username/mobile/email
   * @request password - 密码 MD5(password)
   * @request remember - 是否记住
   */
  router.post('/user/pwdlogin', controller.user.pwdLogin);

  /**
   * 验证码登录
   * @request contact - 账户 mobile/email
   * @request code - 验证码
   * @request remember - 是否记住
   */
   router.post('/user/codelogin', controller.user.codeLogin);

  /**
   * 用户登出
   * @request token - session标记
   */
  router.post('/user/logout', logined, controller.user.logout);

  /**
   * 用户注册
   * @request contact - 账户 mobile/email
   * @request password - 密码 MD5(password)
   * @request code - 验证码
   * @request createAddress - 是否创建账户
   */
  router.post('/user/register', controller.user.register);

  /**
   * 获取用户简要信息
   * @request token - token
   * @response info - 用户信息
   *          { username, email, mobile, address, balance,
   *            contracts: [{ address, title, description, total, done, state }]
   *          }
   */ 
  router.get('/user/info', logined, controller.user.info);

  /**
   * 获取用户个人信息
   * @request token - token
   */
  router.get('/user/profile', logined, controller.user.profile);

  /**
   * 更新个人信息
   */
  router.post('/user/profile/update', logined, controller.user.updateProfile);

  /**
   * 检查账户重复
   * @request contact - 
   */
  // router.post('/user/ckeckaccount', controller.user.checkAccount);

  /**
   * 创建合约
   * @request title - 合约标题
   * @request description - 合约描述
   * @request start - 开始时间
   * @request end - 结束时间
   * @request open - 是否公开
   * @request candidates - 候选人数组 [{ name, description }]
   * @request voters - 投票人数组 [{ name, contact, way }]
   * @request publish - 是否保存
   */
  router.post('/contract/create', logined, controller.contraction.create);

  /**
   * 获取合约
   * @request cid - 合约id
   */
  router.post('/contract/get', logined, controller.contraction.get);

  /**
   * 更新合约
   */
  router.post('/contract/update', logined, controller.contraction.update);

  /**
   * 获取合约信息
   * @request contract - 合约地址
   * @request token - token
   * @response contract - 合约信息
   *          { address, title, description, total, done, state }
   */
  // router.get('/user/contract', controller.contract.get);

  /**
   * 得票统计
   * @request address - 合约地址
   * @request token - token
   * @response tally - 统计结果 
   *          { address, title, description, total, done, state,
   *            condidates: [{ key, name, description, ballot }],
   *            voters: [{ name, contact }]
   *          }
   */ 
  router.get('/contract/detail', logined, controller.contraction.detail);

  

  /***************************** 投票人操作 */

  /**
   * 获取合约信息
   * @request vid - 投票人id
   * @request passcode - 投票人口令
   * @response contract - 合约信息 
   *          { address, title, description, total, done, state,
   *            condidates: [{ key, name, description }]
   *          }
   */
  router.get('/voter/poll', controller.vote.contract);

  /**
   * 投票
   * @request uvd - 投票人id
   * @request passcode - 投票人口令
   * @request candidate - 候选人key
   */
  router.post('/voter/vote', controller.vote.vote);

  /**
   * 得票统计
   * @request address - 投票人地址
   * @request passcode - 投票人口令
   * @request contract - 合约地址
   * @response tally - 统计结果 
   *          { address, title, description, total, done, state,
   *            condidates: [{ key, name, description, ballot }]
   *          }
   */
  router.get('/voter/tally', controller.vote.tally);

  /**
   * 验证选票
   * @request block - 区块Hash
   * @request transaction - 交易Hash
   * @request address - 投票人地址
   * @request contract - 合约地址
   */
  router.post('/voter/verify', controller.vote.verify);

  
  /**
   * 获取验证码
   * @request contact - 联系地址 email/mobile
   */
  router.post('/common/sendcode', controller.common.sendCode);
  
  /**
   * 发送选票链接
   */
  router.post('/common/sendticket', logined, controller.common.sendTicket);

};
