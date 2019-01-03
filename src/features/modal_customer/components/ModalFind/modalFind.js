
import React, { Component } from 'react';
import {StyleSheet, Modal,Text, View, Image,TextInput,TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import colors from '../../styles/colors';
import { isTablet } from '../../constants/isLandscape';
import { CardWithHeader } from '../cards';

class ModalFind extends Component {
    state={
        values: this.props.values,
        valuesResults: [],
        searchStr: '',
        cardheight:0,
        containerheight:0
    }
    find_dimesions(layout){
        const {x, y, width, height} = layout;
        alert(height)
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
        const {addCustomer,closeModal} = this.props
        if(this.state.valuesResults.length>0){
        return this.state.valuesResults.map((item,i)=>{
            let index = item.toLowerCase().indexOf(value.toString().toLowerCase())
            let valLen= value.length
            let name=item.substring(0,item.indexOf('/'));
            let nameLen=name.length
            let number=item.substring(item.indexOf('/')+1,item.length);
            let numberLen=number.length
            const nameMatch = (<View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.labelNameCustomer}>{name.slice(0,index)}</Text>
                <Text style={[{backgroundColor:'#5AC8FA', paddingVertical:hp('0.35%')},styles.labelNameCustomer]}>{name.slice(index,index+valLen)}</Text>
                <Text style={styles.labelNameCustomer}>{name.slice(index+valLen,nameLen)}</Text>
            </View>)
            const numberMatch = (<View style={{flexDirection:'row', alignItems:'center'}}>
                <Text style={styles.labelNumberCustomer}>{number.slice(0,index-1-nameLen)}</Text>
                <Text style={[{backgroundColor:'#5AC8FA', paddingVertical:hp('0.3%')},styles.labelNumberCustomer]}>{number.slice(index-1-nameLen,index+valLen-1-nameLen)}</Text>
                <Text style={styles.labelNumberCustomer}>{number.slice(index-1-nameLen+valLen,numberLen)}</Text>
            </View>)
            return(<TouchableOpacity onPress={()=>{this.setState({searchStr:''}); addCustomer({name:name, number:number}); closeModal()}} style={[styles.itemBox,{flexDirection:'row', alignItems:'center'},i>0?{borderTopWidth:1, borderColor:'rgba(108,123,138,0.08)'}:null]} key={i}>
                {index<nameLen?nameMatch:(<Text style={styles.labelNameCustomer}>{name}</Text>)}
                <Text style={styles.labelNameCustomer}>/</Text>{
                index>nameLen?numberMatch:(<Text style={styles.labelNumberCustomer}>{number}</Text>)}
            </TouchableOpacity>)
        })}else{
            return(<TouchableOpacity style={[styles.itemBox,{flexDirection:'row', alignItems:'center'}]}>
                    <Text style={styles.labelNameCustomer}>+ ADD A NEW CUSTOMER</Text>
                </TouchableOpacity>)
              
        }
    }
    render() {
        
        const {widthModal, active, closeModal} = this.props
        const isLandscape = isTablet
        let height
        return(
            <Modal visible={active} transparent={true} animationType="fade" onRequestClose={closeModal}>
                <View onLayout={(event) => {this.setState({containerheight:event.nativeEvent.layout.height}) }} style={styles.container}>
                <View onLayout={(event) => {this.setState({cardheight:event.nativeEvent.layout.height}) }} style={{alignItems:'center',justifyContent:'center', flex:1, marginTop: -hp('20%')}}>
                <CardWithHeader isLandscape={isLandscape} sizeHeaderLabel={isLandscape?"3.5%":"2.2%"} onPressCloseButton={closeModal} customBodyStyle={{alignItems:'center',justifyContent:'center'}} 
                headerTitle="Customer Information" closeButton={true} customCardStyle={{width: hp(widthModal),}}>

                    <View style={styles.wrapper}>
                        <View style={[styles.fieldBox,{height:hp("5.3%"),width: (hp(widthModal)-hp('6%'))}]}>
                            <Image source={require('../../assets/icons/rectangleLarge.png')} resizeMethod="scale" resizeMode="stretch" 
                            style={{position:'absolute', top:hp("0.3%"),height:hp("4.9%"), width: (hp(widthModal)-hp('6%'))}}/>
                            <TextInput placeholderTextColor="#808080" onChangeText={s=>{this.searchCountry(s)}} placeholder={"Search Name/Mobile Number/Email"} 
                            style={[styles.field,{width: ((hp(widthModal)-hp('6%'))*0.9),}]}/>
                            <Image source={require('../../assets/icons/Shape.png')} style={{position:'absolute', right:hp("2%"),height:hp("2%"), width: hp("2%")}}/>
                        </View>
                        
                    </View>
                    
                </CardWithHeader>
                { this.state.searchStr!=''?
                        <View style={[styles.helpBox,{top:this.state.cardheight/2+hp('4.9%'),width: (hp(widthModal)-hp('6%'))}]}>
                            {
                                this.renderResultsBox()
                            }
                        </View>:null
                        }
                </View>
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
        zIndex:1,
        //top:hp("5.3%"),
        transform: [{'translate': [0,0, 4]}]
    },
    labelNameCustomer:{
        fontFamily:"Montserrat-Bold", 
        fontSize:hp('1.38%'),
        letterSpacing:hp('0.2%')
    },
    labelNumberCustomer:{
        fontFamily:"Montserrat-Bold", 
        fontSize:hp('1.32%'),
        letterSpacing:hp('0.1%')
    },
    itemBox:{
        paddingLeft:hp('3%'),
        paddingVertical:hp('2%')
    }
});

export default ModalFind;
