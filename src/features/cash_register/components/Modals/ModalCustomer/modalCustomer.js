
import React, { Component } from 'react';
import {StyleSheet, Modal} from 'react-native';
import ModalFind from './ModalFind/modalFind';
import colors from '../../../styles/colors';
import ModalAdd from './ModalAdd/modalAdd';

class ModalCustomer extends Component {
    
    render() {
        const {widthModal} = this.props
        return(
            <ModalFind widthModal={widthModal}/>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    
});

export default ModalCustomer;
