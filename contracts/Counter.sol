pragma solidity ^0.8.0;

contract DBT {

    constructor() {
        government = msg.sender;
    }
    
    address public government;
    mapping(address => uint256) public beneficiaryBalances;
    mapping(address => bool) public beneficiaries;

    event Transfer(address indexed sender, address indexed beneficiary, uint256 amount);
    
    function addBeneficiary(address beneficiary) public {
        require(msg.sender == government, "Only government can add beneficiaries");
        beneficiaries[beneficiary] = true;
    }

    function transferFunds(address beneficiary, uint256 amount) public {
        require(msg.sender == government, "Only government can transfer funds");
        require(beneficiaries[beneficiary], "Beneficiary not registered");
        beneficiaryBalances[beneficiary] += amount;
        emit Transfer(msg.sender, beneficiary, amount);
    }
    
    function checkBeneficiary(address beneficiary) public view returns (bool) {
        return beneficiaries[beneficiary];
    }
    
    function getBeneficiaryBalance(address beneficiary) public view returns (uint256) {
        require(beneficiaries[beneficiary], "Beneficiary not registered");
        return beneficiaryBalances[beneficiary];
    }

}
