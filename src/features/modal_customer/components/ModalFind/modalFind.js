
import React, { Component } from 'react';
import {StyleSheet, Modal,Text, View, Image,TextInput} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../styles/colors';
import { isTablet } from '../../constants/isLandscape';
import { CardWithHeader } from '../cards';

class ModalFind extends Component {
    state={
        values: this.props.values,
        valuesResults: [],
        searchStr: ''
    }
    searchCountry = (value) => {
        let filterValues = [];
        
        if(value !== '') {
            filterValues = this.state.values.filter((item) => item.toLowerCase().indexOf(value.toString().toLowerCase()) === -1 ? false : true)
        }
        this.setState({valuesResults: filterValues.slice(0,5), searchStr: value})
        
    }
    renderResultsBox = () => {
        let value=this.state.searchStr;
        console.log(this.state.valuesResults.length)
        this.state.valuesResults.map((item,i)=>{
            let index = item.toLowerCase().indexOf(value.toString().toLowerCase())
            let valLen= value.length
            return(<Text key={i}>{item.slice(0,index)}<Text style={{backgroundColor:'blue'}}>{value}</Text>{item.slice(index+valLen,item.length)}</Text>)
        })
    }
    render() {
        
        const {widthModal, active, closeModal} = this.props
        const isLandscape = isTablet
        return(
            <Modal visible={active} transparent={true} animationType="fade" onRequestClose={closeModal}>
                <View style={styles.container}>
                <CardWithHeader isLandscape={isLandscape} sizeHeaderLabel={isLandscape?"3.5%":"2.2%"} onPressCloseButton={closeModal} customBodyStyle={{alignItems:'center',justifyContent:'center'}} 
                headerTitle="Customer Information" closeButton={true} customCardStyle={{width: hp(widthModal),}}>
                    <View style={styles.wrapper}>
                        <View style={[styles.fieldBox,{height:hp("5.3%"),width: (hp(widthModal)-hp('6%'))}]}>
                            <Image source={require('../../assets/icons/rectangleLarge.png')} resizeMethod="scale" resizeMode="stretch" style={{position:'absolute', top:hp("0.3%"),height:hp("4.9%"), width: (hp(widthModal)-hp('6%'))}}/>
                            <TextInput onChangeText={s=>this.searchCountry(s)} placeholder="Search Name/Mobile Number/Email" style={[styles.field,{width: ((hp(widthModal)-hp('6%'))*0.8),}]}/>
                            <Image source={require('../../assets/icons/Shape.png')} style={{position:'absolute', right:hp("2%"),height:hp("2%"), width: hp("2%")}}/>
                        </View>
                        <View style={[styles.helpBox,{width: (hp(widthModal)-hp('6%'))}]}>
                            {
                                this.renderResultsBox()
                            }
                        </View>
                    </View>
                </CardWithHeader>
            </View>
            </Modal>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container:{
        width:'100%',
        flex: 1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: colors.opacityDin(0.6)
    },
    wrapper:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('2.0%'),
        marginBottom: hp('4.0%'),
    },
    fieldBox:{
        alignItems:'center',
        flexDirection: 'row',
    },
    field:{
        fontSize: hp('1.5%'),
        paddingLeft: hp('2%'),
        paddingVertical: 0,
        fontFamily: 'Montserrat-Bold',
        marginTop:hp("0.3%")
    },
    helpBox:{
        position:'absolute',
        backgroundColor:colors.white,
        borderWidth: 1,
        borderRadius: 10,
        top:hp("5.3%"),
    }
});

export default ModalFind;
