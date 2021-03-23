'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
  async add() {
    this.ctx.body = this.ctx.service.user.add();
  }

  async login() {}

  async logout() {}

  async register() {}

  async info() {}

  async sendCode() {}

  async checkAccount() {}
}

module.exports = UserController;