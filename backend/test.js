const Web3 = require('./node_modules/web3');
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8546');
const abi = require('./migrations/Demo_abi.json');
const bytecode = require('./migrations/Demo_code.json').bytecode;
const address = '0x3F9AE23b7a25eFE260130AA9BD80C0bda685E394';

class aClass {
    async deploy() {
        // console.log('provider:',web3);
        const accountArray = await web3.eth.getAccounts();
        console.log('first account:',accountArray[0]);
        const aContract = new web3.eth.Contract(abi)
        aContract
            .deploy({
                data: '0x'+bytecode, 
            })
            .send({from: accountArray[0], gas: 1000000})
            .on('receipt', (receipt) => {
                console.log('RECEIPT:',receipt) // 收据中包含了新的合约地址
            })
            .then(newContractInstance => {
                console.log('NEW_CONTRACT_INSTANCE:',newContractInstance.options.address) // 新地址的合约实例
                newContractInstance.methods.func(2).call({
                    from: accountArray[0],
                    gas: 1000000,
                }).then(result => {
                    console.log('CALL_METHOD_RESULT:',result)
                }).catch(error => {
                    console.log('CATCH CALL_ERROR:',error)
                })
            })
            .catch(error => {
                console.log('CATCH ERROR:',error)
            })
        // console.log(res);
    }
    async action() {
        const accountArray = await web3.eth.getAccounts();
        console.log('first account:',accountArray[0]);
        const contract = new web3.eth.Contract(abi, address);
        // console.log(contract.methods.func)
        contract.methods.func(2).call({
            from:accountArray[0],
            gas: 1000000,
        }).then(res => {
            console.log('CALL_METHOD_RESULT:',res);
        }).catch(err => {
            console.log('CATCH CALL_ERROR:',err);
        })
    }
    async create() {
        const account = await web3.eth.personal.newAccount('123456')
        console.log('NEW ACCOUNT:',account)
    }
}
const cls = new aClass();
cls.create();