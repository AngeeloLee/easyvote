'use strict';

const Web3 = require('web3');
const web3 = new Web3();

module.exports = {
    contract: {
        // 编译相关
    },
    // 参数校验
    regexps: {
        account: /^([0-9a-zA-Z\-_]{5,64})|(1[^0][0-9]{9})|([0-9a-zA-Z\-_\.]+@[0-9a-zA-Z\-_]+(\.[0-9a-zA-Z\-_]+)+)$/,
        contact: /^(\d+\+1[^0][0-9]{9})|([0-9a-zA-Z\-_\.]+@[0-9a-zA-Z\-_]+(\.[0-9a-zA-Z\-_]+)+)$/,
        username: /^[0-9a-zA-Z\-_]{5,64}$/,
        mobile: /^\d+\+1[^0][0-9]{9}$/,
        email: /^[0-9a-zA-Z\-_\.]+@[0-9a-zA-Z\-_]+(\.[0-9a-zA-Z\-_]+)+$/,
        code: /^[0-9]{6}$/,
        passcode: /^0x[0-9A-F]{32}$/,
        address: /^0x[0-9a-zA-Z]{128}$/,
        // 基础
        bool: /^(true)|(false)$/,
    }
};