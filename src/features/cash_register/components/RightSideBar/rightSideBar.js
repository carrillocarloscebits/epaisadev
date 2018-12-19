//import liraries
import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from './components/Header/header';
import BackgroundImage from './components/BackgroundImage/backgroundImage';
import Table from './components/Table/table';
import Footer from './components/Footer/footer';
import {BoxShadow} from 'react-native-shadow'

// create a component
class RightSideBar extends Component {
    render() {
        const {isLandscape, data, subtotal, discount, delivery,actionClose, type, openDiscount,openDelivery} = this.props
        const width = isLandscape? '39%' : null
        const shadowOpt = {
            width:6,
            height:hp('100%'),
            color:"#000",
            border:5,
            radius:3,
            opacity:isLandscape?0.2:0,
            x:isLandscape?-4:0,
            y:3,
            style:[styles.drawerRightContainer,{width}]
        }
        return (
            
            <BoxShadow setting={shadowOpt}>
                <BackgroundImage source={require('./assets/side_nav_portrait_faded.png') }/>
                <Header actionClose={actionClose} openDiscount={openDiscount} openDelivery={openDelivery}/>
                <Table data={data} actionClose={actionClose}/>
                <Footer data={data} discount={discount} delivery={delivery} subtotal={subtotal} type={type}/>
            </BoxShadow>:null     
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    shadowBox:{
        height:'100%', 
        width:'100%', 
        backgroundColor:'#000000', 
        flexDirection: 'column', 
        position:'absolute', 
        top:0, 
        left:-9, 
        borderRadius:hp('1.4%'), 
        opacity:0.1
    },
    drawerRightContainer: {
        flexDirection:'column',
        height:Dimensions.get('window').height - 25,
        justifyContent:'center',
        backgroundColor:'#5D6770',
    },
});

//make this component available to the app
export default RightSideBar;
