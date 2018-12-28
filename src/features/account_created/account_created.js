import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import ModalMessage from './components/Modal/modalMessage';

class AccountCreated extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    modalActive: true,
  };
  toggleModalMessage = () => {
    this.setState({
      modalActive: !this.state.modalActive,
    });
  };
  render() {
    return (
      <ModalMessage
        onButtonClick={this.props.onButtonClick}
        active={this.state.modalActive}
        toggleModal={this.toggleModalMessage}
      />
    );
  }
}

export default AccountCreated;
