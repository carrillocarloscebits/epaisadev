import React, {Component} from 'react';
import {View, StyleSheet,Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ModalFinger from './components/Modal/modalMessage';

class AccountCreated extends Component{
  static navigationOptions = {
    header: null
  }
  state={
      modalActive:false,
  }
  toggleModalFinger=()=>{
      this.setState({
          modalActive:!this.state.modalActive,
          status:0
      })
  }
  render() {
    return(
        <View style={styles.container}>
            <ModalFinger action={this.changeStatus} status={status[this.state.status]} active={this.state.modalActive} toggleModal={this.toggleModalFinger}/>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  
});

export default AccountCreated