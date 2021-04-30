'use strict';

const Service = require('egg').Service;
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.exmail.qq.com',
  port: 465,
  secure: true,
  secureConnection: true,
  auth: {
    user: 'easyvote@angeelo.fun',
    pass: 'EASYpwd@1999',
  },
});

class CommonService extends Service {
  // 核验验证码
  // async verifyCode(code) {
  //   const { ctx, app } = this;
  //   if (ctx.session.code === code) {
      
  //   }
  // }

  // 发送邮件
  async sendEmail(to, subject, html) {
    const mail = {
      from: '"EasyVote 易投" <easyvote@angeelo.fun>',
      to,
      subject,
      html,
    };
    return await transporter.sendMail(mail);
  }

  // 发送短信
  async sendSms() {}
}
module.exports = CommonService;