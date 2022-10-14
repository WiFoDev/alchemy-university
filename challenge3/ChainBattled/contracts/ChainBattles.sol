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
    struct TokenAttributes {
        uint level;
        uint speed;
        uint strength;
        uint life;
    }
    mapping(uint => TokenAttributes) public tokenIdAttributes;

    constructor() ERC721("Chain Battles", "CBTLS") {}

    function random(uint number) private view returns (uint) {
        return
            uint(
                keccak256(
                    abi.encodePacked(
                        block.timestamp,
                        block.difficulty,
                        msg.sender
                    )
                )
            ) % number;
    }

    function getAttributes(uint tokenId)
        public
        view
        returns (TokenAttributes memory)
    {
        TokenAttributes memory tokenAttributes = tokenIdAttributes[tokenId];
        return tokenAttributes;
    }

    function generateCharacter(uint tokenId)
        public
        view
        returns (string memory)
    {
        TokenAttributes memory tokeAttributes = getAttributes(tokenId);
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            "<style>.base { fill: white; font-family: serif; font-size: 14px; }</style>",
            '<rect width="100%" height="100%" fill="black" />',
            '<text x="50%" y="35%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Warrior",
            "</text>",
            '<text x="50%" y="45%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Levels: ",
            tokeAttributes.level.toString(),
            "</text>",
            '<text x="50%" y="55%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Speed: ",
            tokeAttributes.speed.toString(),
            "</text>",
            '<text x="50%" y="65%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Strength: ",
            tokeAttributes.strength.toString(),
            "</text>",
            '<text x="50%" y="75%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Life: ",
            tokeAttributes.life.toString(),
            "</text>",
            "</svg>"
        );
        return
            string(
                abi.encodePacked(
                    "data:image/svg+xml;base64,",
                    Base64.encode(svg)
                )
            );
    }

    function getTokenURI(uint tokenId) public view returns (string memory) {
        bytes memory metadata = abi.encodePacked(
            "{",
            '"name": "Chain Battles #',
            tokenId.toString(),
            '",',
            '"description": "Battles on chain",',
            '"image": "',
            generateCharacter(tokenId),
            '"',
            "}"
        );

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(metadata)
                )
            );
    }

    function mint() public {
        _tokensId.increment();
        uint newItemId = _tokensId.current();
        tokenIdAttributes[newItemId] = TokenAttributes(
            0,
            random(500),
            random(1000),
            random(100)
        );
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, getTokenURI(newItemId));
    }

    function train(uint tokenId) public {
        require(_exists(tokenId), "This token has not been minted");
        address owner = ownerOf(tokenId);
        require(msg.sender == owner, "You are not the owner of the NFT");
        tokenIdAttributes[tokenId].level++;
        tokenIdAttributes[tokenId].speed += 50;
        tokenIdAttributes[tokenId].strength += 10;
        tokenIdAttributes[tokenId].life += 5;
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }
}
