import React, {Component} from 'react';
import {View, StyleSheet,Text} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ModalMessage from './components/Modal/modalMessage';

class AccountCreated extends Component{
  static navigationOptions = {
    header: null
  }
  state={
      modalActive:true,
  }
  toggleModalMessage=()=>{
      this.setState({
          modalActive:!this.state.modalActive,
      })
  }
  render() {
    return(
        <View style={styles.container}>
            <ModalMessage active={this.state.modalActive} toggleModal={this.toggleModalMessage}/>
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