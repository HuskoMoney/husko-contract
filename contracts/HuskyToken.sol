pragma solidity 0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract HuskyToken is ERC20, ERC20Burnable, Ownable {
    uint256 protocolFee_;
    uint256 cap_;
    address protocolFeeReciever_;

    constructor(uint256 initialSupply,uint256 protocolFee,address protocolfeeReciever,uint256 cap) ERC20("HuskyToken", "HSK") {
        _mint(msg.sender, initialSupply);
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
}