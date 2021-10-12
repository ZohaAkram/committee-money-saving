const assert = require('assert');
const ganache =require ('ganache-cli');
const common = require('mocha/lib/interfaces/common');
const Web3= require('web3');
const web3= new Web3(ganache.provider());

let Committee;
let accounts;
beforeEach(async()=>{
accounts=await web3.eth.getAccounts();
 
});
describe('Committee Contract',()=>{
it('deploys a contract',()=>{
    assert.ok(Committee.options.address);
});
it('allows one account to enter',async()=>{
    await Committee.methods.enter().send({
        from:accounts[0],
        value: web3.utils.toWei('0.012','ether')
    });
    
    const persons=await Committee.methods.getPersons().call({
        from:accounts[0]
    });

    assert.equal(accounts[0],persons[0]);
     assert.equal(1,persons.length);
});
it('allows multiple accounts to enter',async()=>{
    await Committee.methods.enter().send({
        from:accounts[0],
        value: web3.utils.toWei('0.012','ether')
    });
    await Committee.methods.enter().send({
        from:accounts[1],
        value: web3.utils.toWei('0.012','ether')
    });
    await Committee.methods.enter().send({
        from:accounts[2],
        value: web3.utils.toWei('0.012','ether')
    });
    const persons=await Committee.methods.getPersons().call({
        from:accounts[0]
    });

    assert.equal(accounts[0],persons[0]);
    assert.equal(accounts[1],persons[1]);
    assert.equal(accounts[2],persons[2]);
    assert.equal(3,persons.length);
});

it('requires a minimum amount of ether',async()=>{
try{
    await Committee.methods.enter().send({
        
        from:accounts[0],
        value:10
    });
    assert(false);
}
catch(err){
    assert(err);
}
});
it('only manager can call pickWinner',async() =>{
    try{
        await Committee.methods.pickWinner.send({
            from: accounts[1]
        });
        assert(false);
    }
    catch(err){

        assert(err);
    }
})
if('sends money to the winner and resets persons array',async()=>{
    await Committee.methods.send({
        from:accounts[0],
        value: web3.utils.toWei('2','ether')
    });

    const initialBal=await web3.eth.getBalance(accounts[0]);
    await Committee.methods.pickWinner().send({from:accounts[0]});
const finalBal=await web3.eth.getBalance(accounts[0]);

});

});