import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import DBTContract from './contracts/DBT.json';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [government, setGovernment] = useState(null);
  const [beneficiaryToAdd, setBeneficiaryToAdd] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transferAddress, setTransferAddress] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [beneficiaryAdded, setBeneficiaryAdded] = useState(false);
  const [fundsTransferred, setFundsTransferred] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [beneficiaryBalances, setBeneficiaryBalance] = useState(null);

  const connectToWeb3 = async () => {
    try {
      const web3 = new Web3('http://localhost:7545');
      setWeb3(web3);

      const accounts = await web3.eth.getAccounts();
      const government = accounts[0];
      setGovernment(government);
      setAccounts(accounts);

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = DBTContract.networks[networkId];
      const dbtContract = new web3.eth.Contract(DBTContract.abi, deployedNetwork && deployedNetwork.address);
      setContract(dbtContract);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (web3 === null) {
      connectToWeb3();
    }
  }, [web3]);

  const showGovernmentAddress = () => {
    window.alert(`Government Address: ${government}`);
  };

  const addBeneficiary = async () => {
    try {
      await contract.methods.addBeneficiary(beneficiaryToAdd).send({ from: government });
      const beneficiaryExists = beneficiaries.some((val) => val === beneficiaryToAdd);
      if (!beneficiaryExists) {
        setBeneficiaries([...beneficiaries, beneficiaryToAdd]);
        setBeneficiaryAdded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const transferFunds = async () => {
    try {
      if (!beneficiaries.includes(transferAddress)) {
        throw new Error('Transfer address is not a beneficiary.');
      }
      await contract.methods.transferFunds(transferAddress, balance).send({ from: government });
      setFundsTransferred(true);
    } catch (error) {
      console.error(error);
      window.alert(`Error: ${error.message}`);
    }
  };

  const checkBeneficiaryBalance = async () => {
    try {
      const balance = await contract.methods.getBeneficiaryBalance(selectedBeneficiary).call();
      setBeneficiaryBalance(balance);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div class="center">
        <h1>Direct Benefit Transfer System</h1>
        <br />
        <br />
        <br />
        <br />
      </div>
      <div className="content">
        <button onClick={showGovernmentAddress}>Show Government Address</button>
        <br />
        <br />
        <div>
          <label htmlFor="beneficiaryToAdd">Beneficiary Address:</label>&emsp;
          <input id="beneficiaryToAdd" type="text" onChange={(e) => setBeneficiaryToAdd(e.target.value)} /> &nbsp;
          <button onClick={addBeneficiary}>Add Beneficiary</button>
          <br /><br />
        </div>
        <div>
          <label htmlFor="balance">Transfer Amount:</label>&emsp;
          <input id="balance" type="number" onChange={(e) => setBalance(e.target.value)} />
        </div>
        <div>
          <label htmlFor="transferAddress">Transfer Address:</label>&emsp;
          <input id="transferAddress" type="text" onChange={(e) => setTransferAddress(e.target.value)} />&nbsp;&nbsp;
          <button onClick={transferFunds}>Transfer Funds</button>
          <br /><br />
        </div>
        <div>
          <label htmlFor="selectedBeneficiary">Beneficiary Address:</label>&nbsp;
          <input id="selectedBeneficiary" type="text" onChange={(e) => setSelectedBeneficiary(e.target.value)} />&nbsp;&nbsp;
          <button onClick={checkBeneficiaryBalance}>Check Balance</button>

          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
        <div className="status">
        <h2>Status:</h2>
          {beneficiaryAdded && <p>Beneficiary added successfully.</p>}
          {fundsTransferred && <p>Funds transferred successfully.</p>}
          {beneficiaryBalances !== null && (
          <div>
            <p>Balance for {selectedBeneficiary}: {beneficiaryBalances}</p>
          </div>
          )}
      </div>
      </div>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Available Accounts:</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account}>
                <td>{account}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Beneficiaries Address:</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaries.map((beneficiary) => (
              <tr key={beneficiary}>
                <td>{beneficiary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
}

export default App;
