//import liraries
import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image, Modal} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../styles/colors';
// create a component
class ModalMessage extends Component {
    render() {
        const {active, toggleModal} = this.props
        
        return (
            <Modal visible={active} animationType="fade" onRequestClose={toggleModal} transparent={true}>
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        
                    </View>
                </View>
            </Modal>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width:'100%',
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center',
        backgroundColor:colors.opacityDin(0.6)
    },
    wrapper:{
        backgroundColor: colors.white,
        width:hp('45%'),
        justifyContent:'center',
        alignItems:'center',
        borderRadius:20
    },
});

//make this component available to the app
export default ModalMessage;
