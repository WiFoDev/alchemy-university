// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract ChainBattles is ERC721URIStorage {
    using Strings for uint;
    using Counters for Counters.Counter;

    Counters.Counter private _tokensId;
    mapping(uint => uint) public tokenIdLevels;

    constructor() ERC721("Chain Battles", "CBTLS") {}
}
