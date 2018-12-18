
import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image, Modal} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../../styles/colors';

class ModalOptions extends Component {
    render() {
        const {openDiscount, openDelivery} = this.props
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.rowOption} onPress={openDiscount}>
                    <Image style={styles.icon} source={require("../../../assets/img/Discount2.png")} />
                    <Text style={styles.label}>Discount</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rowOption} onPress={openDelivery}>
                    <Image style={styles.icon} source={require("../../../assets/img/Delivery2.png")} />
                    <Text style={styles.label}>Delivery Charge</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container:{
        position: "absolute",
        justifyContent:'center',
        padding: 5,
        top:49,
        right:11,
        backgroundColor:colors.white,
        elevation: 10
    },
    rowOption:{
        flexDirection:'row',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    icon:{
        height:30,
        width:30
    },
    label:{
        color: colors.lightBlack,
        fontFamily: "Montserrat-SemiBold",
        paddingHorizontal: 6,
        fontSize: wp('4.0'),
    }
});

export default ModalOptions;
