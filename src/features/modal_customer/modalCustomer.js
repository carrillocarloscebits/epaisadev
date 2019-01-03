
import React, { Component } from 'react';
import {StyleSheet, Modal} from 'react-native';
import ModalFind from './components/ModalFind/modalFind';
import colors from './styles/colors';
import ModalAdd from './components/ModalAdd/modalAdd';

class ModalCustomer extends Component {
    
    render() {
        const {widthModal, active, closeModal, addCustomer} = this.props
        const values=[
            "ABHISHEK MAURYA/+91 98201 77545",
            "CHAMAN SONI/+91 98201 85453",
            "SURAJ PRAKASH/+91 98201 21264",
            "TAMAN SINGH/+91 98201 54617",
            "RAPHAEL BRAVO/+51 96334 99640",]
        return(
            <ModalFind values={values} addCustomer={addCustomer} widthModal={widthModal} active={active} closeModal={closeModal}/>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    
});

export default ModalCustomer;
