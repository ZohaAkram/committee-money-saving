// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
contract Committee{

    address public manager;
    address[] public persons;

    constructor() public{
        manager=msg.sender;
    }
    function enter() public payable{
        require(msg.value==.01 ether);
        persons.push(msg.sender);
    }
    function random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp,persons)));
    }
function getBalance() public view returns(uint){
    return address(this).balance;
}
    function pickWinner() public restricted {
        address payable winner;
        winner=payable(persons[random() % persons.length]);
    winner.transfer(getBalance());
    persons=new address[](0);
    }
    modifier restricted(){
        require(msg.sender==manager);
        _;
    }
    
    function getPersons() public view returns(address[] memory){
        return persons;
    }
}