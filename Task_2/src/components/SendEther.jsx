
import { useState } from "react";
import "./Main.css";

function SendEther({web3, account}) {

  const [receipt, setReceipt] = useState({});
  const [toggle, setToggle] = useState(false);


  async function sendEthers(event) {
    event.preventDefault();
    const _to = document.querySelector("#to");
    const _value = document.querySelector("#value");

    const tx= {
      from: account,
      to: _to.value, // Replace with the recipient's address
      value: web3.utils.toWei(_value.value, "ether"), // Amount to send in ETH
      gas: 21000, // Gas limit
    }
  await web3.eth.sendTransaction(tx).then((tnx)=>{
    console.log(tnx)
    setReceipt(tnx)
    setToggle(true);
    })
    console.log("Mining transaction...");
    console.log(`Mined in block ${receipt.blockNumber}`);
  }

  return (
    <>
      <form className="box" onSubmit={sendEthers}>
        <p className="label">
          <label htmlFor="">Enter Receiver's Address</label>
          <input className="receiver" type="text" id="to"></input>
        </p>

        <p className="label">
          <label htmlFor="">Enter Amount to Send (Ether)</label>
          <input className="receiver" type="text" id="value"></input>
        </p>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      <div className="box">
  <pre className="json">
    <h3>(Json Response)</h3>
    <code>
      {toggle &&
        JSON.stringify(
          {
            transactionHash: receipt.transactionHash,
            blockHash: receipt.blockHash,
            blockNumber: receipt.blockNumber, // Convert BigInt to string
            gasUsed: receipt.gasUsed, // Convert BigInt to string
          },
          null,
          2
        )}
    </code>
  </pre>
</div>

    </>
  );
}

export default SendEther;
