export default {
    // 用户相关
    pwdLogin: '/user/pwdlogin',
    codeLogin: '/user/codelogin',
    logout: '/user/logout',
    register: '/user/register',
    getInfo: '/user/info',
    getProfile: '/user/profile',
    updateProfile: '/user/profile/update',
    updateAddress: '/user/address/update',
    sendCode: '/common/sendcode',
    destroy: '/user/destroy',
    // 合约相关
    createPoll: '/contract/create',
    getPoll: '/contract/get',
    updatePoll: '/contract/update',
    detailPoll: '/contract/detail',
    sendTicket: '/common/sendticket',
    // 投票相关
    getContract: '/voter/contract',
    vote: '/voter/vote',
    tally: '/voter/tally',
    verify: '/voter/verify',
}