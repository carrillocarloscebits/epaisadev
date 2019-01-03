
import React, { Component } from 'react';
import {StyleSheet, Modal,Text, ScrollView,View} from 'react-native';
import colors from '../../styles/colors';
import { CardWithHeader } from '../cards';
import { isTablet } from '../../constants/isLandscape';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AddCustomerForm from './components/add_customer_form';

class ModalAdd extends Component {
    
    render() {
        const {active,closeModal,widthModal}=this.props
        const isLandscape =isTablet
        return(
            <Modal visible={active} transparent={true} animationType="fade" onRequestClose={closeModal} >
                <ScrollView keyboardShouldPersistTaps="handled" style={styles.container} contentContainerStyle={{alignItems:'center', justifyContent:'center'}}> 
                    <View style={{width:'100%', height:hp('100%'), alignItems:'center',justifyContent:'center'}}>
                    <CardWithHeader isLandscape={isLandscape} sizeHeaderLabel={isLandscape?"3.5%":"2.2%"} onPressCloseButton={closeModal} customBodyStyle={{alignItems:'center',justifyContent:'center'}} 
                        headerTitle="Customer Information" closeButton={true} customCardStyle={{width: hp(widthModal),}}>

                    <AddCustomerForm/>
                    
                </CardWithHeader></View>
                </ScrollView>
            </Modal>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor: colors.opacityDin(0.6)
    },
    wrapper:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('2.0%'),
        marginBottom: hp('4.0%'),
    },
    
});

export default ModalAdd;
