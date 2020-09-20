import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import ArbitrationFactory from '../abis/ArbitrationFactory.json';
import Arbitration from '../abis/Arbitration.json';
import Navbar from './Navbar';
import List from './List';
import {withRouter} from 'react-router';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ipfs from './ipfs';

class App extends Component {

  render () {
    return(
      <Router basename="/eth">
      <Switch>
      <Route path="/list" component={List}>
        
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/add" exact>
        <Home />
      </Route>
      </Switch>
      </Router>
    )
  }

  
}



class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      buffer: null,
      households: null,
      loading: true,
      rol: ''
    }
    
    this.createAgreement = this.createAgreement.bind(this);
    
    this.rolechange = this.rolechange.bind(this);
    
  }

   componentWillMount() {
     this.loadWeb3();
     this.loadBlockchainData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

   async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    var networkData
    const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
    const  networkId = await web3.eth.net.getId()
        networkData = ArbitrationFactory.networks[networkId]
        if(networkData) {
          const ArbitrationFactory = web3.eth.Contract(ArbitrationFactory.abi, networkData.address).at(tokenAddress);
          this.setState({ ArbitrationFactory });
        
         
          
           var PastEvents = [];
          //window.alert(await marketplace.methods.getpersonsstruct().call());
          PastEvents = await marketplace.getPastEvents('ProductCreated', {filter: {wallet: this.state.account},fromBlock: 0 })
             
             
          if (PastEvents.length >0) {
          householdID = await PastEvents[0].returnValues._householdID;
          }else {
            
            householdID =  await marketplace.methods.lasthouseholdID().call();
          }
          var member;
          member =  await marketplace.methods.getmemberslenght(householdID).call();
          //window.alert(householdID,'mem');
     //     var households = await marketplace.methods.households()
          // this.setState({ member })
          this.setState({ householdID });
          this.setState({ member });
          
          // Load products
           for (var i = 0; i < member; i++) {
            const id = await marketplace.methods.getfamilymember(householdID,i).call()
            const product =  await marketplace.methods.persons(id).call()
           this.setState({
              products: [...this.state.products, product]
            })
          } 
          this.setState({ loading: false});
        
        } else {
          window.alert('Marketplace contract not deployed to detected network. Swiych to Ropsten')
        }

      }
    
      
    

     
    rolechange(event){
      this.setState({rol : event.target.value}) 
    }

  




    createAgreement(party1, party2, disp1, disp2, fund1, fund2,_input) {
  this.setState({ loading: true });
 

  this.state.ArbitrationFactory.methods.createArbitration([party1,party2], [disp1,disp2], [fund1,fund2],this.state.marketplace.methods.generateHash(_input)).send({ from: this.state.account})
  .once('receipt', (receipt) => {
    this.setState({ loading: false })
});
const Arbitration = web3.eth.Contract.events.ArbitrationCreated();
console.log(Arbitration);
this.setState({ Arbitration });
contract.transfer(toAddress, fund1, (error, txHash) => {
  // it returns tx hash because sending tx
  console.log(txHash);
});
}



 

  render() {

    return (
      <div>
        <Navbar account={this.state.account} />
        <div><br></br></div>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                :  <div id="content">
                <h1>Add Person</h1>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const country = this.country.value
                  const name = this.productName.value
                  const race = this.productRace.value
                  const photo =this.productPhoto
                  const _role = this.state.rol
    
        this.createAgreement(event,{this.state.account}, counterwallet, 0, amount, amount, 0,_input)
        
                }}>
                   <div className="form-group mr-sm-2">
                    <input 
                      id="wallet"
                      type="text"
                      ref={(input) => { this.country = input }}
                      className="form-control"
                      placeholder={this.state.account}
                      required />
                     
                
          
        
             
            
            
                  </div>
                  <div className="form-group mr-sm-2">
                    <input
                      id="counterwallet"
                      type="text"
                      ref={(input) => { this.productName = input }}
                      className="form-control"
                      placeholder="Name (optional)"
                      
                      />
                  </div>
                  <div className="form-group mr-sm-2">
                    <input 
                      id="_input"
                      type="text"
                      ref={(input) => { this.productRace = input }}
                      className="form-control"
                      placeholder="condition"
                      required >

                </input>
         
                  </div>
                  <div className="form-group mr-sm-2">
                    

           
                       

         
              
                      
                  </div>
          

                  <div onChange={ this.rolechange }>
                  <div className="form-group mr-sm-2">
                    <input
                      id="amount"
                      name="rolec"
                      type="text"
                      
                      className="form-control"
                     
                      placeholder="0"
                      required />
                      <br></br>
                  </div>
                  <div className="form-group mr-sm-2">
        
         <br></br>
                  </div>
      
        </div>
                  <button type="submit" className="btn btn-primary">Add family member</button>
                </form>
                <button type="submit" onClick={this.addfamily}>add other family</button>
                <p>Donation needed for improvment</p>
                <p>&nbsp;</p>
                <h2>Currently added (Current household)</h2>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">hid</th>
                      <th scope="col">Name</th>
                      <th scope="col">Role</th>
                      <th scope="col">Race</th>
                      <th scope="col">Country</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody id="productList">
                    {        this.state.products.map((product, key) => {
          return(
            <tr key={key}>
              <th scope="row">{ product.householdID.toString() }</th>
              <td>{product.name}</td>
               <td>{product.role} </td>
               <td>{product.race}</td>  
              <td>{product.country}</td>
              <td>
              <img src={`https://ipfs.io/ipfs/${product.ipfsHash}`} alt="" width="50"/>
                </td>
            </tr>
          );
        })}
              
              
              
                    
                  </tbody>
                </table>
              </div>
                    
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
