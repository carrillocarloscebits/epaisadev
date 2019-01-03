
import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class UsernameContainer extends Component {
    processName=(value)=>{
        name=value.split(" ");
        result=''
        name.map(str=>result+=(" "+str.charAt(0).toUpperCase()+ str.slice(1).toLowerCase()))
        return result.slice(1);
    }
    render() {
        const {customer,toggleModal}=this.props	
        return (
             <View style={styles.container}>
                <TouchableOpacity onPress={toggleModal} style={styles.usernameBox}>
                    <View style={[styles.shadowBox, customer?{height:hp('7%')}:{height:hp('4.8%')}]} />

                    <View style={[styles.borderBox, customer?{height:hp('7%')}:{height:hp('4.8%')}]}>
                        <Text numberOfLines={1} 
                            style={[styles.defaultText,{paddingTop:hp('0.40%'),paddingRight:wp('2%'), fontSize:customer?hp('2%'):hp('2.2%')}]}>{customer?this.processName(customer.name):"Customer #43"}</Text>
                        {customer && <Text numberOfLines={1} 
                            style={[styles.defaultText,{ fontFamily:'Montserrat-SemiBold', paddingTop:hp('0.2%'), fontSize:hp('1.85%')}]}>{customer.number}</Text>}
                    </View>                 
                </TouchableOpacity>
            </View>
                   
        );
    }
}

const styles = StyleSheet.create({  
    container:{
        height:hp('13.6%'),
        width:'50%',
        backgroundColor: '#5D6770',
    },
    usernameBox:{
        height:'100%', 
        paddingLeft:hp('1.9%'), 
        paddingTop:hp('2.6%'),
    },
    shadowBox:{
        height:hp('7%'), 
        width:'96%',  
        backgroundColor:'#000000', 
        flexDirection: 'column', 
        position:'absolute', 
        top:hp('3%'), 
        left:hp('1.8%'), 
        borderRadius:hp('1.4%'), 
        opacity:0.15
    },
    borderBox:{
        height:hp('7%'), 
        width:'95%', 
        backgroundColor:'#5D6770',  
        flexDirection: 'column', 
        borderWidth:hp('0.14%'), 
        borderRadius:hp('1.4%')
    },
    defaultText:{
        width:'100%',
        paddingLeft:hp('1%'), 
        fontFamily:'Montserrat-Bold', 
        color:'white'
    }
});

export default UsernameContainer;
