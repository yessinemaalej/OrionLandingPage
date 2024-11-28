// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Checkout is ReentrancyGuard {
    address public owner;

    uint256 public fixedPaymentAmount;

    event PaymentReceived(address indexed payer, uint256 amount, string orderId, uint256 timestamp);
    event FundsWithdrawn(address indexed owner, uint256 amount);
    event PromoCodeUpdated(string code, uint256 discount);

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    struct Payment {
        uint256 amount;
        uint256 timestamp;
        string orderId;
    }

    mapping(address => Payment[]) public payments;

    address[] private payers;
    mapping(address => bool) private hasPaid;

    mapping(string => uint256) public promoCodes; // Stores promo codes and their discounts
    string[] private promoCodeKeys; // Array to store all promo codes

    constructor(uint256 _fixedPaymentAmount) {
        owner = msg.sender;
        fixedPaymentAmount = _fixedPaymentAmount;
    }

    function pay(string memory orderId, string memory promoCode) external payable nonReentrant {
        require(bytes(orderId).length > 0, "Order ID is required");

        uint256 payableAmount = fixedPaymentAmount;

        if (bytes(promoCode).length > 0) {
            uint256 discount = promoCodes[promoCode];
            require(discount <= 100, "Invalid discount percentage");
            payableAmount = (fixedPaymentAmount * (100 - discount)) / 100;
        }

        require(msg.value == payableAmount, "Incorrect payment amount");

        if (!hasPaid[msg.sender]) {
            payers.push(msg.sender);
            hasPaid[msg.sender] = true;
        }

        payments[msg.sender].push(Payment({
            amount: msg.value,
            timestamp: block.timestamp,
            orderId: orderId
        }));

        emit PaymentReceived(msg.sender, msg.value, orderId, block.timestamp);
    }

    function withdraw() external onlyOwner nonReentrant {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds to withdraw");

        payable(owner).transfer(contractBalance);
        emit FundsWithdrawn(owner, contractBalance);
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getPaymentsByAddress(address payer) external view returns (Payment[] memory) {
        return payments[payer];
    }

    function getAllPayers() external view returns (address[] memory) {
        return payers;
    }

    function setPromoCode(string memory code, uint256 discount) external onlyOwner {
        require(discount <= 100, "Discount percentage must be between 0 and 100");
        if (promoCodes[code] == 0) {
            promoCodeKeys.push(code); // Add the promo code to the keys array only if it's new
        }
        promoCodes[code] = discount;
        emit PromoCodeUpdated(code, discount);
    }

    function removePromoCode(string memory code) external onlyOwner {
        require(promoCodes[code] > 0, "Promo code does not exist");
        delete promoCodes[code];
        emit PromoCodeUpdated(code, 0);
    }

    function getAllPromoCodes() external view returns (string[] memory codes, uint256[] memory discounts) {
        uint256 length = promoCodeKeys.length;
        codes = new string[](length);
        discounts = new uint256[](length);

        for (uint256 i = 0; i < length; i++) {
            codes[i] = promoCodeKeys[i];
            discounts[i] = promoCodes[promoCodeKeys[i]];
        }

        return (codes, discounts);
    }
}