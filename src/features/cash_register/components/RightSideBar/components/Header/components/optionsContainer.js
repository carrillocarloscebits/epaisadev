
import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const options = [
    {source: require('../../../assets/Delivery2.png'), extraStyle: {marginRight:wp('2.1%')}},
    {source: require('../../../assets/Discount2.png'), extraStyle: {marginRight:wp('2.1%')}},
    {source: require('../../../assets/Close2.png'), extraStyle: {marginRight:wp('3.2%')}},
]
class OptionsContainer extends Component {
    render() {
        return (
            <View style={styles.container}>

                <View style={styles.textContainer}>
                    <Text style={styles.titlePoints}>400 Points</Text>
                </View>

                <View style={[styles.drawerRightTitleContainer]}>
                {
                    options.map((item,i)=>{
                        return(
                        <TouchableOpacity key={i}>
                            <Image source={item.source}
                                style={[styles.drawerRightIcon,item.extraStyle]}/>
                        </TouchableOpacity>)
                    })
                }
                </View>

            </View>     
                   
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container:{
        height:hp('13.6%'),
        width:'50%',
        backgroundColor: '#5D6770',
        flexDirection:'column',  
    },
    textContainer:{
        width:'100%', 
        height:hp('5.8%'), 
        alignItems:'flex-end', 
        justifyContent:'flex-end', 
        paddingRight:wp('4%')
    },
    drawerRightIcon:{
        width:wp('9.5%'),
        height:hp('6.5%'),
        resizeMode: 'contain',
        alignItems:'flex-start',
    },
    drawerRightTitleContainer:{
        height:hp('7.8%'),
        flexDirection:'row',
        width:'100%',
        paddingTop:hp('0.8%'),
        justifyContent:'flex-end',
    },
    titlePoints:{
        fontSize:hp('2.7%'), 
        fontFamily:'Montserrat-Bold', 
        color:'white'
    }
});

export default OptionsContainer;
