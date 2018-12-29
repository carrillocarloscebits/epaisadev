/**
 * Description. Request API
 * @method sendRequest()
 * @return {JSON}
 */
import CryptoJS from 'crypto-js';
import StringBuilder from 'string-builder';

/**
 * Description. Request API
 * @method sendRequest() Send post request to api
 * @return {JSON} Obtain Json from api
 */

const url = 'https://development.epaisa.com';
//const url = 'https://react.epaisa.com';
//const url = 'https://nine.epaisa.com';

 const CLIENT_ID = "VyBqmaWHtyrbRSMzmbgbOy2I"; 

/* async function translateText(language,text){
    var url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl='+language+'&dt=t&q='+encodeURI(text);
    let response =  await fetch(url);   
    let responseJson = await response.json();
    let translation = await responseJson[0][0][0];
    console.log(responseJson[0][0][0]);
    console.log("gg",translation);
    return "gg";
    
  } */

async function sendRequestGet(encryptedParam, direction) {
    console.log("BASE URI: ", url + direction);
    let response = await fetch( url + direction + "?requestParams=" + encodeURIComponent(encryptedParam) + "&clientId=3462h54690qT447025Gb26O1", {        
           headers:{
           'Accept': 'application/json',
          'Content-Type':'application/json'
       }
    });
    let responseJson = await response.json();
    console.log("responseJson: ", responseJson);
    return responseJson;
 }

 async function sendRequest(encryptedParam, direction) { 
    //console.log("Paramsgg",encryptedParam);
    console.log("BASE URI: ", url + direction);    
    console.log("sendRequest ENCRYPARAM: ", encryptedParam);
    let response = await fetch(url+direction,{
        method: 'POST',
           headers:{
           'Accept': 'application/json',
          'Content-Type':'application/json'
       },
        body: JSON.stringify({
            clientId: CLIENT_ID,
            requestParams: encryptedParam            
        })
    });
    let responseJson = await response.json();
    console.log(encryptedParam);
    console.log(responseJson);
    return responseJson;
  }
  
  async function sendRequestPut(encryptedParam,direction) {
    console.log("BASE URI: ", url + direction);
     let response = await fetch(url+direction,{
         method: 'PUT',
            headers:{
            'Accept': 'application/json',
           'Content-Type':'application/json'
        },
         body: JSON.stringify({
             clientId: CLIENT_ID,
             requestParams: encryptedParam            
         })
     });
     //console.log("### response: ",response);
     let responseJson = await response.json();
     return responseJson;
  }

function encryptChangePassword(authKey){
    var verifyString = autKey + '####{"currentPassword":"Test@1234","newPassword":"Test@123456789" }';
    return encryptString(verifyString); 
 }

function encryptGetFunction(authKey, merchantId) {
    var settingString = authKey + '####{"merchantId":' + merchantId + '}';
    console.log("encryptString(settingString)",encryptString(settingString));
    return encryptString(settingString);
 }
 

function encryptJsonCreateUser(userData) {
    let string = new StringBuilder();
    // let userData = {
    //     Username: email,
    //     Password: password,
    //     UserFirstName: firstName,
    //     UserLastName: lastName,
    //     UserMobileNumber: mobile,
    //     registeredReferralCode: referral,
    //     CountryCode: countryCode,
    //     otpType: 1,
    //     BusinessName: company,
    // };
    
    string.append(JSON.stringify(userData));

    console.log("### JSON PARAM", string.toString());

    return encryptString(string.toString());
}

function encryptPaymentsInitiate(authkey,amount) {
    let string = new StringBuilder();
    let requestObject = {
        paymentCurrencyId: 25,
        paymentAmount: parseFloat(amount),
        paymentTipAmount: 0,
        paymentSubTotal: 0,
        paymentTotalDiscount: 0,
        paymentCustomerId: "",
        location: "19.0636695,72.8338119",
        created_at: "",
        customerId: 3902,
        customFieldArray: "{'fieldName':'Doctor Id','fieldValue':'76543'}"
    }
    
    string.append(JSON.stringify(requestObject));
    return encryptString(authkey+"####"+string.toString());
}

function encryptPaymentsProcess() {
    let string = new StringBuilder();
    let requestObject = {
        paymentId: 14674,
        transactionTypeId: 2,
        transactionCurrencyId: 25,
        transactionAmount: 50,
    };
    
    string.append(JSON.stringify(requestObject));
    return encryptString("BRgngTWt4hUFRTK6wW_RI5UOR_IJ01_7kizs0hON-rL4d8kGyHjx2HD-tnfQVfOO####"+string.toString());
}

function encryptDevices(authKey) {
    let string = new StringBuilder();
    let requestObject = {
        merchantId: 3882,
        userId: 3902,
    };
    
    string.append(JSON.stringify(requestObject));
    return encryptString(authKey+"####"+string.toString());
}

function encryptMerchantUserId(userId,merchantId,authKey) {
        let string = new StringBuilder();
        let requestObject = {
            merchantId: merchantId,
            userId: userId,
        };
        string.append(JSON.stringify(requestObject));
        console.log(JSON.stringify(requestObject)); //####
        return encryptString(authKey + "####" + string.toString());
    }

 function encryptMerchantFingerPrintToken(userId,fingerPrintToken,authKey){
    let string = new StringBuilder();
    let requestObject = {
        userId: userId,
        fingerprint: fingerPrintToken,
    };
    string.append(JSON.stringify(requestObject));
    console.log(JSON.stringify(requestObject)); //####
    return encryptString(authKey + "####" + string.toString());
 }

 function encryptFingerPrintLogin(fingerPrintToken){
    let string = new StringBuilder();
    let requestObject = {
        fingerprint: fingerPrintToken,
    };
    string.append(JSON.stringify(requestObject));
    console.log(JSON.stringify(requestObject)); //####
    return encryptString(string.toString());
 }

function encryptJsonCredentials(email, mobile) {
    let string = new StringBuilder();
    let requestObject = {};
    requestObject["username"] = email;
    requestObject["mobile"] = mobile;
    string.append(JSON.stringify(requestObject));
    console.log("JSON REQUEST", requestObject);
    return encryptString(string.toString());
}

function encryptOtpVerify(mobile,otp){
    let string = new StringBuilder();
    let requestObject = {};
    requestObject["0"] = mobile;
    requestObject["1"] = otp;
    requestObject["2"] = 7;
    requestObject["outside"] = true;
    string.append(JSON.stringify(requestObject));
    console.log("JSON REQUEST", requestObject);
    return encryptString(string.toString());
}

function encryptResetPassword(mobile,otp,newpassword,token){
    let string = new StringBuilder();
    let requestObject = {};
    requestObject["mobile"] = mobile;
    requestObject["otp"] = otp;
    requestObject["newpassword"] = newpassword;
    requestObject["token"] = token;
    string.append(JSON.stringify(requestObject));
    console.log("JSON REQUEST", requestObject);
    return encryptString(string.toString());
}

/**
 * @function encryptJson() Encrypts JSON using ecryptString method
 * @return {String} Returns encrypted JSON
 */
function encryptJson(username, password) {
    let string = new StringBuilder();
    let requestObject = {};
    requestObject["username"] = username;
    requestObject["password"] = password;
    requestObject["sourceId"] = 8;
    requestObject["extra"] = ["merchant","store","permissions"];
    string.append(JSON.stringify(requestObject));
    console.log(JSON.stringify(requestObject)); //####
    return encryptString(string.toString());
}



function encryptJsonRequest(request) {
   let string = new StringBuilder();
   
   string.append(JSON.stringify(request)); 
   
   return encryptString(string.toString);
}

/**
 * @function encryptString() TripleDES encrypt
 * @return {String} Returns encrypted String
 */
function encryptString(stringToEncrypt) {

    let rkEncryptionKey = CryptoJS.enc.Utf8.parse("0V7BpWR5r2Zy58ZRkHxeTKLn");
    let rkEncryptionIv  = CryptoJS.enc.Utf8.parse("VyBqmaWH");
    var encrypted = CryptoJS.TripleDES.encrypt(stringToEncrypt, rkEncryptionKey, {mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: rkEncryptionIv});
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

function encryptForgotPassword(string){
    //string = '{"email":"jorge.seminario@poslabs.com"}' o '{"mobile":"7894561231"}'
    var settingString = string;
    return encryptString(settingString);
}


 function encryptJsonVerifyPut(authKey,otpValue) {
    var type ='1'; //Este valor se debe capturar de la pantalla de seleccion: 1 para correo y 2 para celulares.
    var verifyString = authKey + '####{"type":' + type + ', "otpValue":' + otpValue + '}';
    return encryptString(verifyString);  
 }
 
 function encryptJsonVerifyPost(authKey) {
    var type ='1'; //Este valor se debe capturar de la pantalla de seleccion: 1 para correo y 2 para celulares.
    var verifyString = authKey + '####{"type":' + type +'}';
    return encryptString(verifyString);
 }


function decodeString(strignToDecode) {
    let rkEncryptionKey = CryptoJS.enc.Utf8.parse("TKIC0UYnhYbCNRdZVR5xu4nZ");
    let rkEncryptionIv  = CryptoJS.enc.Utf8.parse("VyBqmaWH");
    var decrypted = CryptoJS.TripleDES.decrypt(strignToDecode, rkEncryptionKey, {mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: rkEncryptionIv});
    //var decrypted = CryptoJS.TripleDES.decrypt({strignToDecode: CryptoJS.enc.Base64.parse(strignToDecode) },rkEncryptionKey,{mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: rkEncryptionIv} );
    return decrypted.toString(CryptoJS.enc.Utf8);
 }

export {sendRequest};
export {sendRequestPut};
export {sendRequestGet};
export {encryptJson};
export {encryptJsonCredentials};
export {encryptJsonCreateUser};
export {encryptDevices};
export {encryptPaymentsInitiate};
export {encryptPaymentsProcess};
export {encryptJsonVerifyPut};
export {encryptJsonVerifyPost};
export {encryptChangePassword};
export {encryptGetFunction};
export {encryptForgotPassword};
export {encryptJsonRequest};
export {encryptOtpVerify};
export {encryptResetPassword};
export {encryptMerchantUserId};
export {encryptMerchantFingerPrintToken};
export {encryptFingerPrintLogin};


