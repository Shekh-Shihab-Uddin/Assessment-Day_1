import { useEffect, useState } from "react";
import "./Main.css";

function Accounts({web3, setAccountAddress}) {

  const [provider, setProvider] = useState("null")
  const [balance, setBalance] = useState("null")
  const [account, setAccount] = useState("null")

  useEffect(()=>{
    async function allAccounts(){
      const select = document.querySelector("#selectNumber")
      try{
        const options = await web3.eth.getAccounts();
        setProvider("Sepolia")
        for(let i=0; i<options.length; i++){
          let opt = options[i];
          let element = document.createElement("option");
          element.textContent = opt;
          element.value = opt;
          select.appendChild(element);
        }
      }catch(error){
        setProvider("Not connected");
      }
    }
    web3 && allAccounts();
  },[web3])

  async function selectAccount(){
    let selectedAccount= document.querySelector("#selectNumber").value;
    if(selectedAccount && selectedAccount!="Select an Account"){
      setAccountAddress(selectedAccount);
      setAccount(selectedAccount);
      let accountBalance = await web3.eth.getBalance(selectedAccount);
      // console.log(accountBalance);
      const etherBalance = web3.utils.fromWei(accountBalance,"ether");
      setBalance(etherBalance);
      }
  }

  return (
    <>
      <form className="label1" id="myForm">
        <label htmlFor="">Select an account</label>
        <select className="innerBox" id="selectNumber" onChange={selectAccount}>
        <option>Select an Account</option>
        </select>
      </form>
      <span className="conAc">Connected Account: {account}</span>
      <br></br>
      <span className="acBal">Account Balance: {balance} ether</span>
      <br></br>
      <span className="provider">Provider : {provider}</span>
    </>
  );
}

export default Accounts;
