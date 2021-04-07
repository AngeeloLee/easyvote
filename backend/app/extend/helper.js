const md5 = require('js-md5');
module.exports = {
    // 获取账户类型
    accountType: function(regexps, account) {
        if (regexps.username.test(account)) return 'username';
        if (regexps.mobile.test(account)) return 'mobile';
        if (regexps.email.test(account)) return 'email';
        return 'error';
    },

    // 封装回应消息体
    makeResponse: function({succ, code, msg}, data) {
        return {
            success: succ,
            code: code || 100,
            msg: msg || '请求成功',
            data: data || null,
        };
    },

    // 获取token
    makeToken: function(uid) {
        return md5('' + uid + Date.parse(new Date())).toUpperCase();
    },

    // 获取一个验证码
    makeCode: function() {
        let code = [];
        for (let i=0; i<6; i++) {
            code.push(Math.ceil(Math.random()*9));
        }
        return code.join('');
    },

    // 邮件验证码标题
    codeMailSubject: '[EasyVote易投] 验证码 Verification code',

    // 生成邮件验证码内容
    makeCodeMail: function(code) {
        return `
        <p style="font-weight:bold">您的验证码为：<br>Your verification code:</p>
        <h2 style="font-weight:bold"><a>${code}</a></h2>
        <p style="font-weight:bold">15分钟内有效，请妥善保管。<br>It valid within 15 minutes, keep it properly.</p><br><br>
        <p style="color:gray;font-size:0.8em;">
            如不是您主动获取的，请忽略，如有疑问请联系：<br>
            If this is not your voluntary, ignore. If you have any questions, contact: <br>
            <a href="mailto:easyvote.support@angeelo.fun">easyvote.support@angeelo.fun</a>
        </p>
        <hr size="1"/>
        <div style="display:grid;grid-template-columns:2em 1fr;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 86" style="height:1.7em;fill:gray;padding:0.15em 0;">
                <polygon class="cls-1" points="42.46 77.24 14.85 52.39 22.44 43.96 42.46 61.99 86 22.78 86 0 0 0 0 86 86 86 86 38.04 42.46 77.24"/>
            </svg>
            <p style="color:gray;font-size:0.8em;margin:0 0 0 0.5em;">
                易投 - 安全的在线区块链投票平台<br>
                EasyVote - Secure Blockchain-based online voting platform
            </p>
        </div>`;
    },

    // 生成短信验证码内容
    makeCodeSms: function (code) {},

    // 邮件投票链接标题
    ticketMailSubject: '[EasyVote易投] 投票链接 Vote link',

    // 生成邮件投票链接内容
    makeTicketMail: function(url, passcode) {},

    // 生成短信投票链接内容
    makeTicketSms: function(url, passcode) {},
}