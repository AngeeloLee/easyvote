'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user/add', controller.user.add);

  /************************ 用户操作 */
  /**
   * 用户登录
   * @request account - 账户 username/mobile/email
   * @request way - 登录方式 PWD/CODE
   * @request password - 密码 MD5(password)
   * @request code - 验证码 [可选]
   * @response token - session标记
   * @response uid - 用户id
   */
  router.post('/user/login', controller.user.login);

  /**
   * 用户登出
   * @request token - session标记
   */
  router.post('/user/logout', controller.user.logout);

  /**
   * 用户注册
   * @request account - 账户 username/mobile/email
   * @request password - 密码 MD5(password)
   * @request code - 验证码
   */
  router.post('/user/register', controller.user.register);

  /**
   * 获取用户信息
   * @request token - token
   * @response info - 用户信息
   *          { username, email, mobile, address, balance,
   *            contracts: [{ address, title, description, total, done, state }]
   *          }
   */ 
  router.get('/user/info', controller.user.info);

  /**
   * 创建合约
   * @request title - 合约标题
   * @request description - 合约描述
   * @request expiry - 有效时间
   * @request open - 是否公开
   * @request candidates - 候选人数组 [{ name, description }]
   * @request voters - 投票人数组 [{ name, contact, way }]
   */
  router.post('/user/proposal', controller.contract.proposal);

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
  router.get('/user/tally', controller.contract.tally);

  

  /***************************** 投票人操作 */

  /**
   * 获取合约信息
   * @request address - 投票人地址密文
   * @request passcode - 投票人口令
   * @request contract - 合约地址
   * @response contract - 合约信息 
   *          { address, title, description, total, done, state,
   *            condidates: [{ key, name, description }]
   *          }
   */
  router.get('/voter/contract', controller.contract.get);

  /**
   * 投票
   * @request address - 投票人地址
   * @request passcode - 投票人口令
   * @request candidate - 候选人key
   */
  router.post('/voter/vote', controller.contract.vote);

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
  router.post('/vote/verify', controller.vote.verify);

  
  /**
   * 获取验证码
   * @request contact - 联系地址 email/mobile
   */
  router.post('/common/sendcode', controller.user.sendCode);

  /**
   * 检查账户重复
   * @request contact - 
   */
  router.post('/common/ckeckaccount', controller.user.checkAccount);

};
