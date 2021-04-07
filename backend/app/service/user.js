'use strict';

const Service = require('egg').Service;
class UserService extends Service {
  // 更新用户信息
  async add() {
    const { ctx, } = this;
    const result = ctx.model.User.create({
      userName: 'huruqing',
    });
    return result;
  }

  // 注册
  async register(contact, type, password) {
    try {
      const { ctx, app } = this;
      let uid = null;
      const ext = await ctx.model.User.exists({valid: true, [type]: contact});
      if(!ext) {
        const doc = await ctx.model.User.create({
          username: contact,
          nickname: contact,
          [type]: contact,
          password,
        });
        if (doc) {
          uid = doc._id;
        }
      }
      return uid;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  // 获取用户名
  async username(uid) {
    try {
      const { ctx, app } = this;
      const doc = await ctx.model.User.findById(uid);
      return doc.username;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  // 获取简要信息
  async getInfo(uid) {
    try {
      const { ctx, app } = this;
      const info = await ctx.model.User.findOne(
        {_id: uid, valid: true}, 
        'nickname username address balance contracts registerAt'
      ).populate({
        path: 'contracts',
        select: 'address title description status createdAt total done'
      }).exec();
      // console.log('info:',info)
      return info;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  // 获取详细信息
  async getProfile(uid) {
    try {
      const { ctx, app } = this;
      let info = await ctx.model.User.findOne(
        {_id: uid, valid: true}, 
        'nickname username email mobile address privatekey passcode balance'
      ).exec();
      return info;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  // 修改用户名/密码/昵称
  async updateProfile(uid, username, nickname, password) {
    try {
      const { ctx, app } = this;
      let ret = uid;
      if(nickname) {
        await ctx.model.User.findByIdAndUpdate(uid, { nickname }).exec();
      }
      if (password) {
        await ctx.model.User.findByIdAndUpdate(uid, { password }).exec();
      }
      if (username) {
        const doc = ctx.model.User.exists({ username });
        if (!doc) {
          await ctx.model.User.findByIdAndUpdate(uid, { username }).exec();
        }
      }
      return ret;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  // 修改以太坊账户
  async updateAddress() {}

  async addContract(uid, cid) {
    try {
      const { ctx, app } = this;
      const doc = await ctx.model.User.findByIdAndUpdate(uid, {
        $push: { contracts: cid, }
      });
      return doc ? doc._id : null;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  // 校验密码
  async verify(account, type, password) {
    try {
      const { ctx, app } = this;
      const doc = await ctx.model.User.findOne({valid: true, password, [type]: account}).exec();
      return doc ? doc._id : null;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  // 是否存在用户
  async exist(account, type) {
    try {
      const { ctx, app } = this;
      const doc = await ctx.model.User.findOne({[type]: account}).exec();
      return doc ? doc._id : null;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  // 注销一个用户
  async destroy(uid) {
    try {
      const { ctx, app } = this;
      let ret = uid;
      const doc = await ctx.model.User.findById(uid).exec();
      if (doc) {
        await ctx.model.User.findByIdAndUpdate(uid, {
          valid: false,
          mobile: `$${doc.mobile}$`,
          email: `$${doc.email}$`,
        }).exec();
      }
      return ret;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }
}
module.exports = UserService;