// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

import "hardhat/console.sol";

contract HuskoToken is ERC20Upgradeable, ERC20BurnableUpgradeable, OwnableUpgradeable {
    uint256 public protocolFee_;
    uint256 cap_;
    address protocolFeeReciever_;

    mapping(uint256 => address) charityAddressList;
    uint256 charityIndex;

    function initialize(uint256 initialSupply,uint256 protocolFee,address protocolfeeReciever,uint256 cap) public virtual initializer {
        __Ownable_init();
        __ERC20_init('HuskoToken', 'HSKO');
        _mint(_msgSender(), initialSupply);
        protocolFeeReciever_ = protocolfeeReciever;
        protocolFee_ = protocolFee;
        cap_ = cap;
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        uint256 fee = amount * protocolFee_ / 1000;
        _transfer(_msgSender(), protocolFeeReciever_, fee);
        _transfer(_msgSender(), recipient, amount - fee);
        return true;
    }

    function mint(uint256 amount) public onlyOwner {
        require(totalSupply() + amount < cap_,"Exceeds maximum supply");
        _mint(msg.sender, amount);
    }

    function random() public view returns(uint256) {
        return uint(keccak256(abi.encodePacked(block.timestamp))) % (charityIndex + 1);
    }

    function setProtocolFee(uint256 protocolFee) public onlyOwner {
        protocolFee_ = protocolFee;
    }

    function setProtocolFeeReciever(address protocolFeeReciever) public onlyOwner {
        protocolFeeReciever_ = protocolFeeReciever;
    }

    function setCharityAddresses(address[] memory addresses) public {
        for (uint8 i; i < addresses.length; i++) {
            charityAddressList[i] = addresses[i];
        }
        charityIndex = addresses.length - 1;
    }

    function getCharityAddress(uint256 index) public view returns(address) {
        return charityAddressList[index];
    }

    function getRandomCharityAddress() public view returns(address) {
        uint256 randomNumber = random();
        return charityAddressList[randomNumber];
    }
}