import { sendRequest, encryptJson, encryptJsonCreateUser, encryptJsonCredentials, encryptForgotPassword } from '../services/server-api';

export function login(email, password) {
    const returnEncrypt = encryptJson(email, password);
    return sendRequest(returnEncrypt,'/user/login');
}

export function create_account(userData) {
    
    var returnEncrypt = encryptJsonCreateUser(userData);

    return sendRequest(returnEncrypt,'/user/register')
}

export function check_email(email) {

    var returnEncrypt = encryptJsonCredentials(email, null);

    return sendRequest(returnEncrypt, '/user/check').then(({response}) => {
        const {username} = response;

        return {
            exists: username.exists,
            errors: username.exists ? [] : [username.message]
        }
    })
}

export function check_mobile(mobile) {

    var returnEncrypt = encryptJsonCredentials(null, mobile);

    return sendRequest(returnEncrypt, '/user/check').then(({response}) => {
        const {mobile} = response;
        
        return {
            exists: mobile.exists,
            errors: mobile.exists ? [] : [mobile.message]
        }
    })
}

export function opt_send(value, key) {
    var returnEncrypt = encryptForgotPassword(JSON.stringify({[key]: value}));

    return sendRequest(returnEncrypt, '/user/forgotpassword')
}

// sendRequestApi = ()=>{
//     this.setState({loading:true})
//     var returnEncrypt = encryptJson(this.state.email, this.state.password);
//     sendRequest(returnEncrypt,'/user/login').then((result)=>{
//         //console.log(result);
//         let signIn = result['success'];
//         if(signIn == 1 && result['response']) {
          
//           this.setState({loading:false})
//           //this.saveData(result['response'])
//           this.saveData(result['response']['userFirstName'].toString().charAt(0).toUpperCase() + result['response']['userFirstName'].toString().slice(1).toLowerCase() +" " +
//           result['response']['userLastName'].toString().charAt(0).toUpperCase() + result['response']['userLastName'].toString().slice(1).toLowerCase())
//           this.saveMerchant(result['merchant'])
//           this.saveKey(result['response']['auth_key'])

//           AsyncStorage.getItem('@MySuperStore:LoggedUsers').then((value) => {
//             var loggedUsers = JSON.parse(value)
//             if(loggedUsers){
//                 for(var i = 0;i < loggedUsers.length; i++){
//                   if(loggedUsers[i]['userId'] == result['response']['id']){
//                       this.navigateToCash()
//                       return;
//                   }
//                 }
//                 this.navigateTo('LinkFingerPrint')
//             }else{
//               this.navigateTo('LinkFingerPrint')
//             }
//           })


//         }
//         else {
//           this.setState({loading:false})
//           this.setState({incorretLogin:true})
//         }
//     },()=>{
//       this.setState({loading:false})
//       Alert.alert('Error','Network Error, Please check your connection')
//     });
//   }