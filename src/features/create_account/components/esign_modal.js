import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Modal, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
export default class ESignModal extends Component {
    render() {
        const {modalTermsContainer, modalTermsBox, modalTermsTop, modalTermsTitle, modalTermsTop2, modalTermsText} = styles
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={ ()=>{} }
                presentationStyle="overFullScreen"
            >
                <View style={modalTermsContainer}>
                    <View style={[modalTermsBox,{paddingBottom:10}]} height={Dimensions.get('window').height*0.9}>
                    <View style={{flexDirection:'row',backgroundColor:'transparent',borderRadius:5}}>
                        <TouchableOpacity style={{backgroundColor: '#174285', width:'100%', borderTopLeftRadius: 10, borderTopRightRadius:10}} onPress={this.props.closeModal }>
                            <Text style={{color:'#fff', fontSize:16, fontWeight:'bold', textAlign:'center', paddingVertical:10,letterSpacing:1.5}}>CLOSE</Text>
                        </TouchableOpacity>
                        {/*<TouchableOpacity style={{backgroundColor: '#174285', width:'65%',borderTopRightRadius: 10}} onPress={ ()=>this.getTermsUserDecision() }>
                        <Text style={{color:'#fff', fontSize:16, fontWeight:'bold', textAlign:'center', paddingVertical:10,letterSpacing:1.5}}>ACCEPT</Text>
                        </TouchableOpacity>*/}
                    </View>
                    <View style={{padding:10,flex:1}}>
                    <View style={styles.modalTermsTop}>
                        <Text style={styles.modalTermsTitle}>e-Sign Consent</Text>
                    </View>
                    <View style={styles.modalTermsTop2}>
                    <View>
                        <ScrollView showsVerticalScrollIndicator={true}>
                        <Text style={styles.modalTermsText}>
                            ePaisa, Services {'\n'}{'\n'}
        Limited and its affiliates and third party service providers (“ePaisa”) may need to provide you with certain communications, notices, agreements, billing statements, or disclosures in writing (“Communications”) regarding our products or services (“Services”). {'\n'}{'\n'}
        Your agreement to this E-sign Consent confirms your ability and consent to receive Communications electronically, rather than in paper form, and to the use of electronic signatures in our relationship with you (“Consent”). If you choose not to agree to this Consent or you withdraw your consent, you may be restricted from using the Services. 1. Electronic Delivery of Communications and Use of Electronic Signatures Under this Consent, ePaisa may provide all Communications electronically by email, by text message, or by making them accessible via ePaisa websites or applications. Communications include, but are not limited to, (1) agreements and policies required to use the Services (e.g. this Consent, the ePaisa Privacy Policy, the ePaisa Seller Agreement, the ePaisa Commercial Entity Agreement, and the ePaisa Cash Agreement), (2) payment authorizations and transaction receipts or confirmations, (3) account statements and history, (4) and all federal and state tax statements and documents. We may also use electronic signatures and obtain them from you.2.System RequirementsTo access and retain the electronic Communications, you will need the following:A computer or mobile device with Internet or mobile connectivity{'\n'}{'\n'}
        For website-based Communications, a current web browser that includes 128-bit encryption. Minimum recommended browser standards are Microsoft Internet Explorer version 8.0 and above (see www.microsoft.com/ie for current version), Mozilla Firefox current version (see www.mozilla.com for current version), Apple Safari current version (see www.apple.com/safari for current version), or Chrome current version (see www.google.com/chrome for current version). The browser must have cookies enabled.{'\n'}{'\n'}
        For application-based Communications, a mobile phone operating system that supports text messaging, downloads, and applications from the Apple App Store or Google Play store{'\n'}{'\n'}
        Access to the email address used to create an account for ePaisa Services.{'\n'}{'\n'}
        Sufficient storage space to save Communications and/or a printer to print them.{'\n'}{'\n'}
        If you use a spam filter that blocks or re-routes emails from senders not listed in your email address book, you must add no-reply@ePaisa.com to your email address book.3. Paper Delivery of CommunicationsYou have the right to receive Communications in paper form. To request a paper copy of any Communication at no charge, please write to ePaisa, Services {'\n'}{'\n'}
        Limited, C 25, Vasant Vihar, IInd Floor, Local Shopping Center C Block, New Delhi, 110057, India Attn: Customer Support – Legal (“ePaisa Address”) within 90 days of the date of the Disclosure, specifying in detail the Communication you would like to receive.4. Withdrawal of Consent to Electronic CommunicationsYou may withdraw your consent to receive electronic Communications at any time, by writing to the ePaisa Address. However, withdrawal of your consent to receive electronic Communications may result in termination of your access to Services. Any withdrawal of your consent will be effective after a reasonable period of time for processing your request.5. Updating Your Email Address{'\n'}{'\n'}
        You can change your email address by writing to the ePaisa Address. You may also be able to change your email address yourself through the Services.
                            </Text>
                        </ScrollView>
                        </View>
                        </View>

                    </View>

                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = EStyleSheet.create({
    /*Terms Modal*/
  modalTermsContainer: {
    backgroundColor: 'rgba(47, 49, 51, 0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius:10
  },
  modalTermsBox: {
      width: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    borderTopRightRadius:11,
    borderTopLeftRadius:11
  },
  modalTermsTop: {
    flexDirection: 'row',
    justifyContent: 'center',
    //alignItems: 'center',
    //marginBottom:10,
    flex:0.1
  },
  modalTermsTop2: {
    flexDirection: 'row',
    justifyContent: 'center',
    //alignItems: 'center',
    //marginBottom:10,
    flex:1
  },
  modalTermsTitle:{
    flex: 0.9,
    flexDirection:'column',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#174285',
  },
  modalTermsButtonContainer:{
    flex: 0.1,
    justifyContent: 'flex-end',
  },
  modalTermsButtonText:{
    fontSize: '2rem',
  },
  modalTermsBottom: {
    
  },
  modalTermsText: {
    fontFamily: "Roboto-Medium",
    margin: 5,
    textAlign: 'justify',
    fontSize: '1.5rem',
  },
})