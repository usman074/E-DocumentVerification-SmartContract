pragma solidity ^0.5.0;

contract certificateVerification {

    struct Organization{
        address orgAddress;
        bool exists;
    }

    struct Document{
        bytes32 orgId;
        bool verified;
    }
    
    modifier owneronly{
        require(msg.sender == owner, "Authorization Error");
        _;
    }

    mapping(bytes32 => Document) private documents;
    mapping(bytes32 => Organization) private organizations;
    address private owner;

    constructor() public {
        owner = msg.sender;
    }

    function addCertificate(bytes32 documentHash,bytes32 orgId) public returns(string memory){
        Organization memory orgData = organizations[orgId];
        Document memory docData = documents[documentHash];
        require(msg.sender == orgData.orgAddress,"Authorization Error");
        require(documentHash.length == 32, "Hash is invalid");
        require(!docData.verified,"Document already verified");
        documents[documentHash] = Document(orgId,true);
        return "Document is added in blockchain";
    }
    
    function verifyCertificates(bytes32 documentHash) public view returns(bytes32,bool){
        require(documentHash.length == 32, "Hash is invalid");
        Document memory docData = documents[documentHash];
        if(docData.verified)
        { 
            return (docData.orgId,true);
        }
        else
        {
            return ("Document is not verified",false);
        }
    }

    function addOrganization(address orgAddress, bytes32 orgId) public owneronly() returns(string memory){
        require(orgId.length == 32, "Organization Id is invalid");
        organizations[orgId] = Organization(orgAddress,true);
        return "Organization Added Successfully";
    }

    function modifyOrganizationAddress(address orgAddress, bytes32 orgId) public owneronly() returns(string memory){
        Organization memory orgData = organizations[orgId];
        require(orgData.exists,"Organization is not registered");
        organizations[orgId] = Organization(orgAddress, true);
        return "Organization Address Updated Successfully";
    }
}