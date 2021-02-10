const Election = artifacts.require("Election");

contract("Election", accounts => {

    it("initializes with two candidates", () =>
        Election.deployed()
        .then(instance => instance.candidatesCount())
        .then(count => {
            assert.equal(
                count,
                2,
                "There aren't two candidates!"
            )
        })
    );

    it("initializes the candidates with the correct values", () => {
        let instanceElection;
        return Election.deployed()
        .then(instance => {
            instanceElection = instance;
            return instance.candidates(1)
        })
        .then(candidate => {
            assert.equal(candidate[0],1,"Not contain correct id!");
            assert.equal(candidate[1],"Adonias Pires","Not contain correct name!");
            assert.equal(candidate[2],0,"Not contain correct votes count!"); 
            return instanceElection.candidates(2);           
        }).then(candidate => {
            assert.equal(candidate[0],2,"Not contain correct id!");
            assert.equal(candidate[1],"Dalva Pires","Not contain correct name!");
            assert.equal(candidate[2],0,"Not contain correct votes count!");             
        })
    });
});