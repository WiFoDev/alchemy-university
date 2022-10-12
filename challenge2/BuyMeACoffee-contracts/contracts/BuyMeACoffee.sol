// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract BuyMeACoffee {
    event NewMemo(
        address indexed from,
        uint timestamp,
        string name,
        string messagge
    );

    struct Memo {
        address from;
        uint timestamp;
        string name;
        string message;
    }

    address payable owner;

    Memo[] memos;

    constructor() {
        owner = payable(msg.sender);
    }

    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    function buyACoffee(string memory _name, string memory _messagge)
        public
        payable
    {
        require(msg.value > 0, "I can't buy a coffee for free");
        memos.push(Memo(msg.sender, block.timestamp, _name, _messagge));
        emit NewMemo(msg.sender, block.timestamp, _name, _messagge);
    }

    function withdrawTips() public {
        require(msg.sender == owner, "You are not the owner");
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success, "Failed To Sent ETH");
    }
}
