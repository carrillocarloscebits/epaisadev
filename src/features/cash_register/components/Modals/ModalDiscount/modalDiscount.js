
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

const options =["%","₹"]
class ModalDiscount extends Component {
    state={
        optionsActive: false,
        optionSelected: 1,
        valueDiscount: 0,
        inputFocus:false,
    }
    render() {
        const {active, closeModal,addDiscount} = this.props
        return(
            <Modal visible={active} transparent={true} animationType="fade" onRequestClose={closeModal} >
            <View style={styles.container}>
                <CardWithHeader customBodyStyle={{alignItems:'center',justifyContent:'center'}} headerTitle="Discount" closeButton={true} onPressCloseButton={closeModal} customCardStyle={{width: '65%',}}>
                    <View style={styles.wrapper}>
                        <View style={styles.rowForm}>
                            <View style={styles.leftForm}>
                                <Text style={styles.select}>{options[this.state.optionSelected-1]}</Text>
                                <TouchableOpacity style={styles.drop} onPress={()=>{this.setState({optionsActive:true})}}>
                                    <Icon  name={"angle-down"} size={20} />
                                </TouchableOpacity>
                                
                            </View>
                            <View style={styles.separation}>

                            </View>
                            <View style={styles.rightForm}>
                                <TextInput value={this.state.valueDiscount>0 || this.state.valueDiscount?this.state.valueDiscount:""} onChangeText={(valueDiscount)=>{this.setState({valueDiscount})}} onFocus={()=>{this.setState({inputFocus:true, optionsActive:false})}} style={styles.textInput}/>
                                <TouchableOpacity style={styles.icon} onPress={()=>{this.setState({value: 0})}}>
                                <IconMaterialIcons  name={"cancel"} size={20} color="#666"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{width:'100%', justifyContent:'flex-start'}}>
                        
                        <TouchableOpacity
                            onPress={()=>{addDiscount({discount: parseFloat(this.state.valueDiscount) ,type:options[this.state.optionSelected-1]})}}
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
                        {
                                    this.state.optionsActive?
                                    <View style={styles.dropdown}>{
                                        options.map((item,i)=>{
                                            return(
                                                <TouchableHighlight key={i} onPress={()=>{this.setState({optionsActive:false,optionSelected: (i+1)})}}>
                                                    <Text style={styles.option}>{item}</Text>
                                                </TouchableHighlight>
                                            )
                                        })}
                                    </View>:null
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
        borderBottomColor: '#174285',
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
        width:'70%',
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
        paddingLeft: wp('6%'),
        fontSize:wp('4.1%'),
        width:'80%',
        marginBottom: 5,
        fontFamily: 'Montserrat-ExtraBold',
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
        elevation: moderateScale(5),
        top:0,
        left:0
      },
      option:{
          textAlign:'center',
          fontSize: wp('4%'),
          paddingVertical: hp('1.1%'),
          backgroundColor:"#FAFAFA",
          fontFamily: 'Montserrat-ExtraBold',
      }
});

export default ModalDiscount;
