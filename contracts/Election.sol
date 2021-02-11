// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <=0.8.0;

contract Election
{
    //Model a Candidate
    struct Candidate
    {
        uint id;
        string name;
        uint voteCount;
    }
    //Store accounts that have voted
    mapping(address => bool) public voters;
    //Store Candidates
    mapping(uint => Candidate) public candidates;
    //Fetch Candidates
    //Store Candidates Count
    uint public candidatesCount;

    constructor()
    {
        addCandidate("Adonias Pires");
        addCandidate("Dalva Pires");
    }

    event votedEvent(
        uint indexed _candidateId
    );

    function addCandidate(string memory _name) private{
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public{
        //Require that they haven't voted before
        require(!voters[msg.sender]);
        //Require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);
        //record that voter has voted
        voters[msg.sender] = true;
        //update candidate votecount
        candidates[_candidateId].voteCount++;

        emit votedEvent(_candidateId);
    }
}