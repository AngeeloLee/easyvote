const Web3 = require('./node_modules/web3');
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8546');
const md5 = require('./node_modules/md5.js')
// const abi = require('./migrations/Demo_abi.json');
// const bytecode = require('./migrations/Demo_code.json').bytecode;
const abi = require('./migrations/Poll_abi.json');
const bytecode = require('./migrations/Poll_bin.json').bytecode;
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
        try {
            // const account = await web3.eth.personal.newAccount('123456')
            // const account = await web3.eth.accounts.create('123456')
            const account = await web3.eth.accounts.create('123456')
            console.log('NEW ACCOUNT:',account)
        } catch(error) {
            console.log('ERROR:',error)
        }
    }
    async poll() {
        const accountArray = await web3.eth.getAccounts();
        let start = new Date();
        let end = new Date();
        end.setFullYear(start.setFullYear() + 1);
        start.setFullYear(start.getFullYear() - 5);
        const keys = ['0xA332805B2A6D644E4E595F060ED63BA8', '0x5501BD033ACE27C8E615058C823F9546'];
        const names = ['candidate_A', 'candidate_B'];
        const voters = [accountArray[0], accountArray[1]];
        const contract = new web3.eth.Contract(abi);
        const transaction = await contract.deploy({
            data: bytecode,
            arguments: [false, '一个投票', start.valueOf(), end.valueOf(), keys, names, voters] // TODO 参数
        });
        let gasCost = await transaction.estimateGas();
        // gasCost = gasCost.ceil();
        transaction.send({from: accountArray[0], gas: gasCost+1000000}).on('receipt', (receipt) => {
            console.log('RECEIPT:',receipt);
        }).then(newContractInstance => {
            newContractInstance.methods.vote('0xA332805B2A6D644E4E595F060ED63BA8').call({
                from: accountArray[0],
                gas: 1000000
            }).then(res => {
                console.log('VOTE RESULT:',res);
                newContractInstance.methods.getPoll().call({
                    from: accountArray[0],
                    gas: 10000000
                }).then(poll => {
                    console.log('POLL:',poll);
                }).catch(pollerr => {
                    console.log('GET POLL ERROR:',pollerr);
                })
            }).catch(err => {
                console.log('VOTE ERROR:',err);
            })
            // newContractInstance.methods.getPoll().call({
            //     from: accountArray[0],
            //     gas: 10000000
            // }).then(poll => {
            //     console.log('POLL:',poll);
            // }).catch(pollerr => {
            //     console.log('GET POLL ERROR:',pollerr);
            // })
        })
    }
}
const cls = new aClass();
cls.create();

// function parseCamel(obj) {
//     if (typeof(obj) != 'object') return obj;
//     for(const key in obj) {
//         const val = obj[key];
//         console.log('val:',val)
//         const keyArr = key.split('_');
//         for (let i=1; i<keyArr.length; i++)
//         keyArr[i] = keyArr[i].replace(keyArr[i][0], keyArr[i][0].toUpperCase());
//         const newKey = keyArr.join('');
//         delete obj[key];
//         obj[newKey] = parseCamel(val);
//     }
//     return obj;
// }
// let obj = {
//     user_name: 'Tony',
//     current_position: 'developer',
//     age: 45
//   }
// console.log(parseCamel(obj))