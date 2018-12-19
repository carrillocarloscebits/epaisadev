
import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,TouchableHighlight,Image, Modal, TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CardWithHeader} from "../../../../../components/cards"
import Icon from "react-native-vector-icons/FontAwesome";
import colors from '../../../styles/colors';
import { SelectWithTextInput } from '../../../../../components/inputs';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from '../../../constants/util/scaling';

class ModalDelivery extends Component {
    state={
        optionsActive: false,
        valueDelivery: 0,
        inputFocus:false,
        wrong: false,
    }
    addValidate(){
        const {addDelivery} = this.props
        this.setState({wrong: false});
        addDelivery(parseFloat(this.state.valueDelivery));                 
    }
    render() {
        const {active, closeModal} = this.props
        const wrongStyleLabel= this.state.wrong? {color:'#D0021B'}:null
        const wrongStyleBorders= this.state.wrong? {borderColor:'#D0021B'}:null
        const noFormat = parseFloat(this.state.valueDelivery) > 0? false: true
        
        return(
            <Modal visible={active} transparent={true} animationType="fade" onRequestClose={closeModal} >
            <View style={styles.container}>
                <CardWithHeader customBodyStyle={{alignItems:'center',justifyContent:'center'}} headerTitle="Delivery Charge" closeButton={true} onPressCloseButton={closeModal} customCardStyle={{width: '65%',}}>
                <View style={styles.wrapper}>
                        <View style={[styles.rowForm,wrongStyleBorders]}>
                            <View style={styles.rightForm}>
                                <Text style={[styles.textIcon,wrongStyleLabel]}>₹ </Text>
                                <TextInput value={this.state.valueDelivery>'0' || this.state.valueDelivery?this.state.valueDelivery.toString():""} 
                                        onChangeText={(valueDelivery)=>{this.setState({valueDelivery})}} 
                                        onFocus={()=>{this.setState({inputFocus:true, optionsActive:false})}} 
                                        style={[styles.textInput,wrongStyleLabel]}/>
                                <TouchableOpacity style={styles.icon} onPress={()=>{this.setState({valueDelivery: 0})}}>
                                <IconMaterialIcons  name={"cancel"} size={20} color="#666"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{width:'100%', justifyContent:'flex-start'}}>
                        <View style={{width:'100%', alignItems:'center'}}>
                        <TouchableOpacity
                            onPress={()=>{
                                !noFormat? 
                                this.addValidate():
                                this.setState({wrong: true})
                            }}
                            style={styles.touchableModalDiscountAdd }>

                            <LinearGradient 
                                colors={['#174285', '#0079AA']} 
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={ { borderRadius: 50 } }>        
                                <View style= {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}} >
                                <Text style= { styles.textDiscountAddButtonPortrait}>ADD</Text>                
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        </View>
                        {
                            this.state.wrong?
                            <View style={styles.messageWrong}>
                                <View style={{flexDirection:'row',width:'125%', justifyContent:'center', alignItems:'center'}}>
                                <Image source={require('../../../../../assets/icons/error.png')} style={{width: wp('2.8'),height:wp('2.8'),marginTop:2}}/>
                                    <Text style={styles.messageWrongLabel}>
                                {" Enter a valid delivery charge from > 0.0"}
                                </Text></View>
                            </View>
                            :null
                        }            

                        
                        </View>
                    </View>
                </CardWithHeader>
            </View>
            </Modal>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container:{
        width:'100%',
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: colors.opacityDin(0.6)
    },
    wrapper:{
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginTop: hp('5%')
    },
    rowForm:{
        flexDirection:'row',
        alignItems:'center',
        borderColor: '#174285',
        borderBottomWidth: 2,
    },
    leftForm:{
        flexDirection:'row',
        width:'30%',
        alignItems:'center',
        justifyContent:'space-around',
        
    },
    separation:{
        borderColor: '#174285',
        borderRightWidth: 2,
        height:'100%',
    },
    rightForm:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
    },
    drop:{
        marginRight:wp('2%')
    },
    select:{
        textAlign:'center',
        fontSize: wp('4.4%'),
        marginLeft: 10,
        color:'#174285',
        fontFamily: 'Montserrat-SemiBold',
        marginBottom: 5,
    },
    icon:{
        position:'absolute',
        right: 4
    },
    textInput:{
        paddingVertical: 0,
        color:'#174285',
        marginLeft: wp('10%'),
        fontSize:wp('4.1%'),
        width:'60%',
        marginBottom: 5,
        fontFamily: 'Montserrat-Bold',
    },
    textIcon:{
        width:wp('10%'),
        position:'absolute',
        top:2,
        left:0,
        textAlign: 'right',
        color:'#174285',
        fontSize:wp('4.1%'),
        fontFamily: 'Montserrat-Bold',
        marginBottom: 5,
    },
    textDiscountAddButtonPortrait:{
        fontFamily: 'Montserrat-SemiBold', 
        color:'white', 
        fontSize: hp('1.95%'), 
        letterSpacing: 1.33
      },
      touchableModalDiscountAdd:{
        width: wp('50%'),
        height: hp('6.25%'),
        marginTop: hp('5%'),
        elevation: moderateScale(3),
        borderRadius: 50,
        marginBottom: hp('3%')
      },
      dropdown:{
        position: 'absolute',
        width: '30%',
        elevation: 20,
        top:0,
        left:0,
        borderLeftColor: colors.opacityDin(0.1),
        borderRightColor: colors.opacityDin(0.3),
        borderBottomColor: colors.opacityDin(0.3),
        borderWidth: 1,
      },
      option:{
          textAlign:'center',
          fontSize: wp('4%'),
          paddingVertical: hp('1.1%'),
          backgroundColor:"#FAFAFA",
          fontFamily: 'Montserrat-ExtraBold',
      },
      messageWrong:{
        width: '100%',
        position: 'absolute',
        top: 2,
        flexDirection: 'row',
        justifyContent: 'center'
      },
      messageWrongLabel:{
        fontSize: wp('2.4'),
        color: '#D0021B',
        flexWrap: 'wrap',
        fontFamily: 'Montserrat-Bold',
        textAlign:'center',
        marginTop:2,
      }
});

export default ModalDelivery;
