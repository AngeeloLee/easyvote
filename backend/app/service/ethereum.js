'use strict';

const Service = require('egg').Service;
const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const md5 = require('js-md5');
const abi = require('../../migrations/Poll_abi.json');
const bytecode = require('../../migrations/Poll_bin.json').bytecode;

class EthereumService extends Service {
  
  /**
   * 创建账户
   * @param {String} passcode 
   * @returns {Object} {address, privatekey, passcode}
   */
  async createAccount(passcode) {
    try {
      const account = await web3.eth.accounts.create(passcode)
      console.log(account)
      return {
        address: account,
        privatekey: account.privateKey,
        passcode,
      }
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  /**
   * 解锁账户
   * @param {String} address 
   * @param {String} passcode 
   * @returns 
   */
  async unlockAccount(address, passcode) {
    try {
      const result = await web3.personal.unlockAccount(address, passcode)
      return result
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }

  /**
   * 发布合约
   * @param {String} owner 
   * @param {Object} interface 
   * @param {String} bytecode 
   * @param {Object} args 
   * @returns {Object} {address}
   */
  async publishContract(owner, {title, candidates, voters, open, start, end}) {
    try {
      let keys = [], names = [];
      for (const cand of candidates) {
        keys.push(md5(cand));
        names.push(cand);
      }
      const contract = new web3.eth.Contract(abi);
      const transaction = await contract.deploy({
        data: bytecode,
        arguments: [open, title, start.valueOf(), end.valueOf(), keys, names, voters] // 补充合约构造函数参数
      });
      const gasCost = await transaction.estimateGas() + 10000;
      // gas 不够用于支付部署费用
      if (eth.getBalance(owner) < gasCost) {
        return 'NOT_ENOUGH_GAS';
      }
      const contractInstance = await transaction.send({from: owner, gas: gasCost});
      return contractInstance ? contractInstance.options.address : null;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }
}
module.exports = EthereumService;