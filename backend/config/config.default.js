/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1613103180494_8364';

  // add your middleware config here
  config.middleware = ['guard'];

  // // Logined中间件配置
  // config.logined = {
  //   //
  // }

  // guard中间件的配置
  config.guard = {
    // 登录状态无效
    INVALID_TOKEN: 499,
    // 参数校验失败
    FAILED_VALIDATE: 422,
  }

  // Session
  config.session = {
    key: 'EGG_SESS',
    maxAge: 60*60*24, // 秒*分钟*小时
    renew: true,
    httpOnly: true,
    encrypt: true,
  }

  //csrf
  config.security = {
    csrf: {
      enable: false,
    }
 }

  // MonfoDB
  config.mongoose = {
    url: process.env.EGG_MONGODB_URL || 'mongodb://localhost/easyvote',
    options: {
      useFindAndModify: false,
    },
  };

  // add your user config here
  const userConfig = {
    // 会话有效时长（秒）
    sessionLifetime: 60*60*24,
    // 验证码有效时长（秒）
    codeLifetime: 60*15,
    // 频繁验证码发送间隔（秒）
    codeFrequenceInterval: 60,
    // 延长session时长（秒）
    maxSessionLifetime: 60*60*24*30,
    // 新用户注册发送验证码用
    newAccountId: Symbol('newAccountId'),
    //------------------ 邮箱相关 --
    // 邮箱服务器域名
    mailServerAddress: 'smtp.exmail.qq.com',
    // 邮箱服务端口
    mailServerPort: 465,
    // 邮箱账号
    mailAccount: 'easyvote@angeelo.fun',
    // 邮箱密码
    mailPassword: 'EASYpwd@1999',
  };

  return {
    ...config,
    ...userConfig,
  };
};
