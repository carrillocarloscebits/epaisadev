import React, {Component} from 'react';
import {View, Platform, Modal, TouchableOpacity} from 'react-native';
import { Card } from 'components';

class PopUp extends Component {
    render() {

        const modalContainer = {
            backgroundColor: 'rgba(47, 49, 51, 0.6)',
            flex: 1,
            alignItems:'center',
            justifyContent:'center',
         }

        const {animation, children, style} = this.props;

        return (
            <Modal
                onRequestClose={ ()=>{} }
                animationType={animation}
                transparent={true}
                visible={true}
                presentationStyle="overFullScreen"
                >
                <TouchableOpacity style={modalContainer} activeOpacity={1}>
                    <Card style={style}>
                        {children}
                    </Card>
                </TouchableOpacity>
            </Modal>
        )
    }
}

export {PopUp}