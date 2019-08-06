/**
 * It will do the processing on data pulled from database
 */
"use strict";
// ===========================================
// Load Modules
// ===========================================
const Joi = require("joi");

var ProcessRequest = function(request) {
  this.addCertificateParams = function() {
    const schema = {
      orgId: Joi.string()
        .min(32)
        .max(32)
        .required(),
      documentHash: Joi.string()
        .min(32)
        .max(32)
        .required()
    };
    return Joi.validate(request, schema);
  };
  this.addOrganizationParams = function() {
    const schema = {
      orgId: Joi.string()
        .min(32)
        .max(32)
        .required(),
      orgAddress: Joi.string()
        .min(42)
        .max(42)
        .required()
    };
    return Joi.validate(request, schema);
  };
  this.verifyCertificatesParams = function() {
    const schema = {
      documentHash: Joi.string()
        .min(32)
        .max(32)
        .required()
    };
    return Joi.validate(request, schema);
  };

  /*
  this.SanitizeRequest = function() {
    return new Promise(function(resolve, reject) {
      try {
        let data = _.pick(request, [
          "invoiceId",
          "amount",
          "merchantId",
          "currency",
          "api_key",
          "user_email",
          "callback_url"
        ]);

        let len = _.keys(data).length;
        if (len !== 7) {
          log.warn("Data doesn't contain all required attributes", data);
          reject("Data doesn't contain all required attributes");
        } else {
          if (
            _.isString(data.merchantId) &&
            _.isString(data.invoiceId) &&
            _.isString(data.currency) &&
            _.isString(data.api_key) &&
            _.isString(data.user_email) &&
            _.isString(data.callback_url)
          ) {
            if (typeof data.amount == "number") {
              resolve("Data validated");
            } else {
              reject("Amount must be an integer");
            }
          } else {
            reject("Merchant Id, Currency and Invoice Id must be a string");
          }
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  //TODO: This will generate address against xpubkey and update the index
  this.GenerateAddress = function() {
    return new Promise(function(resolve, reject) {
      try {
        var elements_len = Object.keys(request).length;
        if (elements_len != 7) {
          reject(400);
        } else {
          DB.GetMerchantIndexVal(request.merchantId)
            .then(index => {
              DB.GetMerchantXPUBKEY(request.merchantId)
                .then(xpubkey => {
                  let xpubString = bitcoin.bip32
                    .fromBase58(xpubkey, network)
                    .derivePath("0/" + index);
                  const { address } = bitcoin.payments.p2pkh({
                    pubkey: xpubString.publicKey,
                    network: network
                  });
                  console.log(address);
                  log.debug("Address generated %s on index %d", address, index);
                  index++;
                  DB.UpdateMerchantIndex(index, request.merchantId)
                    .then(() => {
                      resolve(address);
                    })
                    .catch(err => {
                      reject(err);
                    });
                  //const xpriv = 'tprv8ZgxMBicQKsPd7Uf69XL1XwhmjHopUGep8GuEiJDZmbQz6o58LninorQAfcKZWARbtRtfnLcJ5MQ2AtHcQJCCRUcMRvmDUjyEmNUWwx8UbK'
                  //const xpriv='tpubDD5iSoymEpxtV39N4AHjNMFwGGMwQhkutPN2xUx7u1F4Hqs'

                  // const node = bip32.fromBase58(xpubkey, bitcoin.networks.testnet).derivePath("0/" + index);
                  // const address=bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address
                  // console.log(address)
                  // index++;
                  // DB.UpdateMerchantIndex(index,request.merchantId).then(()=>{
                  //     resolve(address);
                  // }).catch((err)=>{
                  //     reject(err);
                  // });
                })
                .catch(err => {
                  reject(err);
                });
            })
            .catch(err => {
              reject(err);
            });
        }
      } catch (e) {
        return reject(e);
      }
    });
  };*/
};
module.exports = ProcessRequest;
