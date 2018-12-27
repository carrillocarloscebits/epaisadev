import React, {Component} from 'react';
import {View, StyleSheet,Text} from 'react-native';
import BackgroundImage from './components/BackgroundImage/backgroundImage';
import Footer from './components/Footer/footer';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FingerContainer from './components/FingerContainer/fingerContainer';
import ModalFinger from './components/Modal/modalFinger';
import {isTablet} from './constants/isLandscape';

const status=['normal','success','warning']
const isPhone= !isTablet
class FingerPrint extends Component{
  static navigationOptions = {
    header: null
  }
  state={
      modalActive:false,
      status:0
  }
  toggleModalFinger=()=>{
      this.setState({
          modalActive:!this.state.modalActive,
          status:0
      })
  }
  changeStatus =()=>{
      this.state.status<2?
        this.setState({
            status:this.state.status+1
        }):
        this.setState({
            modalActive:!this.state.modalActive,
        }) 
  }
  render() {
    return(
        <View style={styles.container}>
            <BackgroundImage source={require("./assets/img/side_nav_portrait_faded.png")} />
                {
                    !isPhone?
                    <View style={[styles.wrapper,{height:hp('85%')}]}>
                        <Text style={[styles.textDown,{fontSize: hp('2%'),fontFamily:"Montserrat-SemiBold"}]}>All of the fingerprints stores on this device can be used to log into your ePaisa account.</Text>
                    </View>
                    :
                    <View style={styles.wrapper}>
                        <Text style={styles.textDown}>All of the fingerprints stores on this device can be used to</Text>
                        <Text style={styles.textDown}>log into your ePaisa account.</Text>
                    </View>
                }
            <Footer openModal={this.toggleModalFinger}/>
            <FingerContainer/>
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
  wrapper:{
      width:"100%",
      height:hp('89%'),
      alignItems:'center',
      justifyContent:'flex-end',
      paddingBottom: hp('1.5%'),
  },
  textDown:{
      textAlign:'center',
      fontSize: hp('1.4%'),
      fontFamily:"Montserrat-Bold",
      color:'#575B64'
  }
  
});

export default FingerPrint