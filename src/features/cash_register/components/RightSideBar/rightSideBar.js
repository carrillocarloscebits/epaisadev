//import liraries
import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Header from './components/Header/header';
import BackgroundImage from './components/BackgroundImage/backgroundImage';
import Table from './components/Table/table';
import Footer from './components/Footer/footer';
// create a component
class RightSideBar extends Component {
    render() {
        const {data, subtotal, discount, delivery,actionClose, type} = this.props
        return (
            <View style={styles.drawerRightContainer}>
                <BackgroundImage source={require('./assets/side_nav_portrait_faded.png') }/>
                <Header actionClose={actionClose}/>
                <Table data={data} actionClose={actionClose}/>
                <Footer data={data} discount={discount} delivery={delivery} subtotal={subtotal} type={type}/>
            </View>       
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    drawerRightContainer: {
        flexDirection:'column',
        height:Dimensions.get('window').height - 25,
        justifyContent:'center',
        backgroundColor:'#5D6770',
    },
});

//make this component available to the app
export default RightSideBar;
