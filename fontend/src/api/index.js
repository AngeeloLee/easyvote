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
getContract: '/contract/get',
updatePoll: '/contract/update',
detailPoll: '/contract/detail',
sendTicket: '/common/sendticket',
// 投票相关
getPoll: '/voter/',
vote: '/voter/vote',
tally: '/voter/tally',
verify: '/voter/verify',
}