App = {
  contracts: {},
  load: async () => {
    await App.initWeb3()
    await App.initContract()
    await App.bindEvents()
  },

  initWeb3: async () => {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum
      try {
        // Request account access
        await window.ethereum.enable()
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: async () => {
    const election = await $.getJSON("Election.json")
    App.contracts.Election = TruffleContract(election)
    App.contracts.Election.setProvider(App.web3Provider)
  },

  bindEvents: async () => {
    var electionInstance;
    //var loader = $("#loader");
    //var content = $("#content");

    web3.eth.getCoinbase(function (err, account) {
      if (err == null) {
        App.account = account;
        $("#accountsAddress").html("Your Account: " + account);
      }
    })

    
      electionInstance = await App.contracts.Election.deployed();
      var candidatesResult = $("#candidatesResults");
      candidatesResult.empty();
      electionInstance.candidatesCount().then((candidateCount) => {
        console.log(candidateCount)
        for (var i = 1; i <= candidateCount; i++) {
          electionInstance.candidates(i).then(function (candidate) {
            var id = candidate[0];
            var name = candidate[1];
            var voteCount = candidate[2];
            var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td><tr>"
            candidatesResult.append(candidateTemplate);
          }).catch(function (error) {
            console.warn(error);
          })
        }
      })
  },
};

$(() => {
  $(window).on("load", () => {
    App.load();
  });
});

/*$(document).ready(function () {
  App.load();
});*/