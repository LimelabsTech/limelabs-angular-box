import { Component, OnInit } from '@angular/core';

import { Web3Service } from "../../util/web3.service";

@Component({
  selector: 'app-meta-sender',
  templateUrl: './meta-sender.component.html',
  styleUrls: ['./meta-sender.component.css']
})
export class MetaSenderComponent implements OnInit {
  constructor(private web3Service: Web3Service) {
    console.log("Constructor: " + web3Service);
  }

  accounts: string[];
  metaCoinInstance: any;

  model = {
    amount: 5,
    receiver: "",
    balance: 0,
    account: ""
  };

  status = "";

  async ngOnInit() {
    this.watchAccount();
    this.metaCoinInstance = await this.web3Service.MetaCoin.deployed();
    this.refreshBalance();
  }

  watchAccount() {
    this.web3Service.accountsObservable.subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        this.model.account = accounts[0];
        console.log(this.model.account);
      }
    });
  }

  setStatus(status) {
    this.status = status;
  };

  sendCoin() {
    if (!this.metaCoinInstance) {
      this.setStatus("metaCoinInstance is not loaded, unable to send transaction");
      return;
    }

    console.log("Sending coins" + this.model.amount + " to " + this.model.receiver);


    let amount = this.model.amount;
    let receiver = this.model.receiver;

    this.setStatus("Initiating transaction... (please wait)");

    this.metaCoinInstance.sendCoin(receiver, amount, { from: this.model.account }).then((success) => {
      if (!success) {
        this.setStatus("Transaction failed!");
      }
      else {
        this.setStatus("Transaction complete!");
        this.refreshBalance();
      }
    }).catch((e) => {
      console.log(e);
      this.setStatus("Error sending coin; see log.");
    });

  };

  refreshBalance() {
    console.log("Refreshing balance");


    this.metaCoinInstance.getBalance.call(this.model.account).then((value) => {
      console.log("Found balance: ", value);
      this.model.balance = value.valueOf();
    }).catch(function (e) {
      console.log(e);
      this.setStatus("Error getting balance; see log.");
    });
  };

  clickAddress(e) {
    this.model.account = e.target.value;
    this.refreshBalance();
  }

  setAmount(e) {
    console.log("Setting amount: " + e.target.value);
    this.model.amount = e.target.value;
  }

  setReceiver(e) {
    console.log("Setting receiver: " + e.target.value);
    this.model.receiver = e.target.value;
  }

}
