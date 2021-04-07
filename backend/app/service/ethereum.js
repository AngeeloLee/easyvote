'use strict';

const Service = require('egg').Service;
const Web3 = require('web3')
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const abi = require('./migrations/Demo_abi.json');
const bytecode = require('./migrations/Demo_code.json').bytecode;

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
  async publishContract(owner, {candidates, voters, open, start, end}) {
    try {
      const contract = new web3.eth.Contract(abi);
      const transaction = await contract.deploy({
        data: bytecode,
        arguments: [] // TODO 补充合约构造函数参数
      });
      const gasCost = await transaction.estimateGas() * 1.2;
      // gas 不够用于支付部署费用
      if (eth.getBalance(owner) < gasCost) {
        return 'NOT_ENOUGH_GAS';
      }
      const address = await transaction.send({from: owner, gas: gasCost}).on('receipt', (receipt) => {
        // TODO 部署成功后更新数据库
      });
      return address || null;
    } catch (error) {
      this.app.logger.error(error);
      return null;
    }
  }
}
module.exports = EthereumService;