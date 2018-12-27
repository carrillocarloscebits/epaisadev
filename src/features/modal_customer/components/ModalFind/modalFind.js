
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
        this.setState({searchStr:value});
        let filterValues = [];
        
        if(value !== '') {
            filterValues = this.state.values.filter((item) => item.toLowerCase().indexOf(value.toString().toLowerCase()) === -1 ? false : true)
        }
        this.setState({valuesResults: filterValues.slice(0,5)})
        
    }
    renderResultsBox = () => {
        let value=this.state.searchStr;
        console.log(this.state.valuesResults.length)
        return this.state.valuesResults.map((item,i)=>{
            let index = item.toLowerCase().indexOf(value.toString().toLowerCase())
            let valLen= value.length
            let name=item.substring(0,item.indexOf('/'));
            let nameLen=name.length
            let number=item.substring(item.indexOf('/')+1,item.length);
            let numberLen=number.length
            const nameMatch = (<View style={{flexDirection:'row', alignItems:'center'}}><Text style={{fontFamily:"Montserrat-Bold", fontSize:hp('1.3%'),letterSpacing:hp('0.2%')}}>{name.slice(0,index)}</Text><Text style={{backgroundColor:'blue',fontFamily:"Montserrat-Bold", fontSize:hp('1.3%'),letterSpacing:hp('0.2%')}}>{name.slice(index,index+valLen)}</Text><Text style={{fontFamily:"Montserrat-Bold", fontSize:hp('1.3%'),letterSpacing:hp('0.2%')}}>{name.slice(index+valLen,nameLen)}</Text></View>)
            const numberMatch = (<View style={{flexDirection:'row', alignItems:'center'}}><Text>{number.slice(0,index-1-nameLen)}</Text><Text style={{backgroundColor:'blue'}}>{number.slice(index-1-nameLen,index+valLen-1-nameLen)}</Text><Text>{number.slice(index-1-nameLen+valLen,numberLen)}</Text></View>)
            return(<View style={{flexDirection:'row', alignItems:'center'}} key={i}>{index<nameLen?nameMatch:(<Text>{name}</Text>)}<Text>/</Text>{index>nameLen?numberMatch:(<Text>{number}</Text>)}</View>)
            //return(<Text key={i}><Text key={i} style={{color:'blue'}}>{name.slice(0,index<nameLen?index:nameLen)}<Text style={{backgroundColor:'blue'}}>{index<nameLen?name.slice(index,index+valLen):null}</Text>{name.slice(index+valLen,nameLen)}/</Text><Text key={i} style={{color:'red'}}>{number.slice(0,index>nameLen?index+1:numberLen)}<Text style={{backgroundColor:'blue'}}>{index>nameLen?number.slice(index,index+1+valLen):null}</Text>{number.slice(index+valLen,nameLen)}</Text></Text>)
            //return(<Text key={i}>{item.slice(0,index)}<Text style={{backgroundColor:'blue'}}>{item.slice(index,index+valLen)}</Text>{item.slice(index+valLen,item.length)}</Text>)
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
                            <Image source={require('../../assets/icons/rectangleLarge.png')} resizeMethod="scale" resizeMode="stretch" 
                            style={{position:'absolute', top:hp("0.3%"),height:hp("4.9%"), width: (hp(widthModal)-hp('6%'))}}/>
                            <TextInput placeholderTextColor="#808080" onChangeText={s=>{this.searchCountry(s)}} placeholder="Search Name/Mobile Number/Email" 
                            style={[styles.field,{width: ((hp(widthModal)-hp('6%'))*0.9),}]}/>
                            <Image source={require('../../assets/icons/Shape.png')} style={{position:'absolute', right:hp("2%"),height:hp("2%"), width: hp("2%")}}/>
                        </View>
                        { this.state.valuesResults.length>0?
                        <View style={[styles.helpBox,{width: (hp(widthModal)-hp('6%'))}]}>
                            {
                                this.renderResultsBox()
                            }
                        </View>:null
                        }
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
        fontSize: hp('1.8%'),
        paddingLeft: hp('2%'),
        paddingVertical: 0,
        fontFamily: 'Montserrat-Bold',
        marginTop:hp("0.3%"),
        color:"#52565F"
    },
    helpBox:{
        position:'absolute',
        backgroundColor:colors.white,
        elevation: 10,
        borderRadius: 10,
        top:hp("5.3%"),
    }
});

export default ModalFind;
