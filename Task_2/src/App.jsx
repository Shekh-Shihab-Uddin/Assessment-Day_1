import { useEffect, useState } from "react";
import "./App.css";
import Accounts from "./components/Accounts.jsx";
import SendEther from "./components/SendEther.jsx";
import Welcome from "./components/Welcome.jsx";
import getWeb3 from "./getWeb3";

function App() {
  const [web3, setWeb3] = useState(null);

  const [account, setAccount] = useState(null);

  function setAddress(address){
    setAccount(address);
  }

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        setWeb3(web3);
        //console.log(web3);
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);
  return (
    <div className="Flex">
      <div className="welMargin">
        <Welcome />
      </div>
      <div className="Account">
        <Accounts web3={web3} setAccountAddress={setAddress}/>
      </div>

      <div>
        <SendEther web3={web3} account={account}/>
      </div>
    </div>
  );
};
export default App;
