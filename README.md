# How to configure the React App

Steps:-

1) Clone the repository

2) Type `npm install`

3) Install all the required dependencies like web3 etc.

4) Open ganache and configure all the settings that are required  
    
    (i) To insert project insert `truffle-config.js` to start 

5) Compile the contract using the following commands

    (i)`truffle compile`
    
    (ii)`truffle console --network ganache`
    
    (iii) `migrate`
    
6) Type `npm start`    


PS - Copy the DBT.json file from location P2P_Transaction_using_Blockchain/src/contracts/DBT.json and paste the same file there named as Counter.json




# Overview of the project
This is a React-based web application for a Direct Benefit Transfer (DBT) system. It allows a user to connect to a local blockchain network, add beneficiaries to the system, transfer funds to the beneficiaries, and check the balance of a specific beneficiary.

The `App` component defines the state variables for the web3 instance, contract instance, government account, beneficiary address, balance, transfer address, available accounts, beneficiaries, and beneficiary balances. It also defines the functions to connect to the local blockchain network using web3, show the government address, add a beneficiary, transfer funds to a beneficiary, and check the balance of a beneficiary.

The `useEffect` hook is used to trigger the connection to the blockchain network when the web3 instance is null. The JSX code defines the UI elements for the application, including buttons to show the government address, add a beneficiary, transfer funds, and check the balance of a beneficiary. The available accounts are displayed in a table.
