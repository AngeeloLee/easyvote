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
        <p style="font-weight:bold">
            您的验证码为：<br>
            Your verification code:
        </p>
        <h2 style="font-weight:bold"><a>${code}</a></h2>
        <p style="font-weight:bold">
            15分钟内有效，请妥善保管。<br>
            It valid within 15 minutes, keep it properly.
        </p><br><br>
        <p style="color:gray;font-size:0.8em;">
            如不是您主动获取的，请忽略，如有疑问请联系：<br>
            If this is not your voluntary, ignore. If you have any questions, contact: <br>
            <a href="mailto:easyvote.support@angeelo.fun">easyvote.support@angeelo.fun</a>
        </p>
        <hr size="1"/>
        <div style="display:grid;grid-template-columns:2em 1fr;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 86" style="height:1.7em;fill:gray;padding:0.15em 0;">
                <polygon class="cls-1" points="42.53 70.95 14.93 46.1 22.52 37.67 42.53 55.7 86.08 16.49 86 0 0 0 0 86 86 86 86.08 31.75 42.53 70.95"/>
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
    ticketMailSubject: '[EasyVote易投] 投票邀请 Vote invitation',

    // 生成邮件投票链接内容
    makeTicketMail: function(title, url, ticket, passcode) {
        return `
        <p>
            您被邀请参与发布在易投的投票，点击下面链接进入投票：<br>
            You are invited to participate in the poll published on EasyVote, click the link below to vote:
        </p>
        <p style="font-weight:bold">
            标题/Title: ${title}<br>
            链接/Link: <a href="${url}">${url}</a><br>
            选票编号/Ticket number: ${ticket}<br>
            口令/Passcode: ${passcode}
        </p>
        <p>
            若链接失效，您也可以进入<a href="easyvote.angeelo.fun">易投官网</a>使用选票编号和口令参与投票。<br>
            If the link fails, you can also enter the <a href="easyvote.angeelo.fun">site of EasyVote</a> to vote with above Ticket number and Passcode.
        </p><br><br>
        <p style="color:gray;font-size:0.8em;">
            如有疑问请联系：<br>
            If you have any questions, contact: <br>
            <a href="mailto:easyvote.support@angeelo.fun">easyvote.support@angeelo.fun</a>
        </p>
        <hr size="1"/>
        <div style="display:grid;grid-template-columns:2em 1fr;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 86" style="height:1.7em;fill:gray;padding:0.15em 0;">
                <polygon class="cls-1" points="42.53 70.95 14.93 46.1 22.52 37.67 42.53 55.7 86.08 16.49 86 0 0 0 0 86 86 86 86.08 31.75 42.53 70.95"/>
            </svg>
            <p style="color:gray;font-size:0.8em;margin:0 0 0 0.5em;">
                易投 - 安全的在线区块链投票平台<br>
                EasyVote - Secure Blockchain-based online voting platform
            </p>
        </div>`;
    },

    // 生成短信投票链接内容
    makeTicketSms: function(url, passcode) {},
}