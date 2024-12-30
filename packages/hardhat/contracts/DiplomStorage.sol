//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * A smart contract that allows changing a state variable of the contract and tracking the changes
 * It also allows the owner to withdraw the Ether in the contract
 * @author BuidlGuidl
 */
contract DiplomStorage {
    // State Variables
     struct Diplom {
        string ownerName;
        string diplomId;
        string university;
        uint256 issueDate;
    }


    address public admin;
    mapping(string => Diplom) private diploms;
    mapping(address => string[]) private ownerDiploms;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addDiplom(
        string memory _ownerName,
        string memory _diplomId,
        string memory _university,
        uint256 _issueDate
    ) public onlyAdmin {
        require(bytes(diploms[_diplomId].diplomId).length == 0, "Diplom already exists");
        diploms[_diplomId] = Diplom(_ownerName, _diplomId, _university, _issueDate);
        ownerDiploms[tx.origin].push(_diplomId);
    }

    function verifyDiplom(string memory _diplomId) public view returns (bool) {
        return bytes(diploms[_diplomId].diplomId).length > 0;
    }

    function getDiplomsByOwner(address _owner) public view returns (string[] memory) {
        return ownerDiploms[_owner];
    }
}