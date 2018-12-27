import React, {Component} from 'react';
import {Text, View, ScrollView, TouchableOpacity, Modal, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';

const stylesButtons = EStyleSheet.create({
    container: {
        width:'100%',
        height: '5.5rem',
        flexDirection: 'row',
        elevation: 5,
        backgroundColor: 'white',
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    button: {
        alignItems: 'center',
        justifyContent:'center',
    },
    buttonWhite: {
        flex: 1.8,
        backgroundColor: 'white',
        borderColor: '#174285',
        borderWidth: 1,
        borderTopLeftRadius: 12
    },
    buttonAccept: {
        flex: 3.2
    },
    gradient: {
        alignItems: 'center',
        justifyContent:'center',
        width:'100%',
        borderTopRightRadius: 12
    },
    textWhite:{
        color:'#174285',
    },
    text: {
        color:'#FFFFFF',
        fontSize: '1.8rem',
        fontFamily:'Montserrat-SemiBold'
    }
});
export default class ESignModal extends Component {
    render() {
        const {modalBackdrop, modalContent, modalTitleContainer, modalTermsTitle, modalBody, modalTermsText} = styles
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={this.props.visible}
                onRequestClose={ ()=>{} }
                presentationStyle="overFullScreen"
            >
                <View style={modalBackdrop}>
                    <View style={modalContent}>
                        {/* <View style={{flexDirection:'row',backgroundColor:'transparent',borderRadius:5}}>
                            <TouchableOpacity style={{backgroundColor: '#174285', width:'100%', borderTopLeftRadius: 10, borderTopRightRadius:10}} onPress={this.props.closeModal }>
                                <Text style={{color:'#fff', fontSize:16, fontWeight:'bold', textAlign:'center', paddingVertical:10,letterSpacing:1.5}}>CLOSE</Text>
                            </TouchableOpacity>
                        </View> */}
                        <View style={stylesButtons.container}>
                            <TouchableOpacity style={[stylesButtons.button, stylesButtons.buttonWhite]} onPress={this.props.closeModal }>
                                <Text style={[stylesButtons.text, stylesButtons.textWhite]} >DECLINE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[stylesButtons.button, stylesButtons.buttonAccept]} onPress={this.props.closeModal }>
                                <LinearGradient
                                    colors={['#174285', '#0079AA']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={stylesButtons.gradient}>           
                                    <View style= {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} >
                                        <Text style={stylesButtons.text}>ACCEPT</Text>   
                                    </View>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1}}>
                            <View style={modalTitleContainer}>
                                <Text style={modalTermsTitle}>e-Sign Consent</Text>
                            </View>
                            <View style={modalBody}>
                                <View>
                                    <ScrollView showsVerticalScrollIndicator={true}>
                                        <Text style={modalTermsText}>
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
    modalBackdrop: {
        backgroundColor: 'rgba(47, 49, 51, 0.6)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '92%',
        height: '96%',
        backgroundColor: 'white',
        borderRadius: 12
    },
    modalTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5rem'
    },
    modalBody: {
        flexDirection: 'row',
        justifyContent: 'center',
        flex:1,
        padding: 10,
        paddingTop: 0
    },
    modalTermsTitle:{
        flex: 0.9,
        flexDirection:'column',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: '2rem',
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
        fontSize: '1.2rem',
    },

    '@media (min-width: 500)': {
        modalContent: {
            width: '80%',
        },
    }
})