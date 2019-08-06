const express = require("express");
const processReq = require("../ProcessRequest/ProcessReq");
const Web3 = require("web3");
const fs = require("fs");

let web3 = new Web3("http://127.0.0.1:7545");
var senderAddress = "0xD3b2A24EF8cd68a8DD6cFd656ba2BB038B853D81";
var contractAddress = "0x5CA514e3af38e3dCA889CC2C2989Eab62947ec44";

var strAbi = fs.readFileSync("abi.json", "utf-8");
let abi = JSON.parse(strAbi);

var contract = new web3.eth.Contract(abi, contractAddress);

const router = express.Router();

router.post("/addCertificate", async (req, res) => {
  try {
    const Processreq = new processReq(req.body);
    const { error } = await Processreq.addCertificateParams(); //processReq.addCertificateParams(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    } else {
      req.body.orgId = "0x" + req.body.orgId;
      req.body.documentHash = "0x" + documentHash;
      await contract.methods
        .addCertificate(req.body.documentHash, req.body.orgId)
        .send(
          {
            from: senderAddress,
            gas: 600000
          },
          transactionHash => {
            console.log(transactionHash);
          }
        );
      res.end();
    }
  } catch (error) {
    res.send(error.message);
    res.end();
  }
});
module.exports = router;
