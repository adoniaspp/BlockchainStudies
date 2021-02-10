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

    function addCandidate(string memory _name) private{
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }
}