// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;
contract Committee{

    address public manager;
    address[] public persons;

    constructor() public{
        manager=msg.sender;
    }
    function enter() public payable{
        require(msg.value>.01 ether);
        persons.push(msg.sender);
    }
    function random() private view returns(uint){

    }
}