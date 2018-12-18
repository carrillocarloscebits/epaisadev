
import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image, Modal} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {CardWithHeader} from "../../../../../components/cards"
import colors from '../../../styles/colors';

class ModalDelivery extends Component {
    render() {
        const {active, closeModal} = this.props
        return(
            <Modal visible={active} transparent={true} animationType="fade" onRequestClose={closeModal} >
            <View style={styles.container}>
                <CardWithHeader headerTitle="Delivery Charge" closeButton={true} onPressCloseButton={closeModal} customCardStyle={{width: '65%',}}>
                    <Text>Hola</Text>
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
});

export default ModalDelivery;
