import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image,Keyboard, ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import EditProduct from '../../../../EditProduct';
import {editProductPortrait} from '../../../../EditProduct/styles/editProductPortrait';
import {editProductLandscape} from '../../../../EditProduct/styles/editProductLandscape';
import {formatNumberCommasDecimal} from 'api';

import ImagePicker from 'react-native-image-picker';

const isPortrait = () => {
    const dim = Dimensions.get('window');
    if(dim.height >= dim.width){
      return true;
    }else {
      return false;
    }
};

class ProductDetail extends React.Component{
    constructor(props){
        super(props)

        this.state = {           
            orientation: isPortrait(),
            detailVisible: false,

            imagePath: '',
            imageHeight: '',
            imageWidth: '',

            heightCard: 0,
            marginTopCard: 0,
            marginBottomCard: 0,
        }
    }

    openImagePicker() {
        const options = {
            title: 'Select your option',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }
        ImagePicker.showImagePicker(options, (response) => {
            if(response.didCancel){
                console.log('Canceled')
            } else if (response.error) {
                alert('Something went wrong with this option. Try again later.')
                console.log(response.error)
            } else if (response.customButton) {
                alert('Custom button tapped : '+response.customButton)
            } else {
                this.setState({
                imagePath: response.uri,
                imageHeight: response.height,
                imageWidth: response.width
                })
            }
        })
    }

    closeModal = () => {
        this.setState({
            detailVisible: false},
            ()=>{
                this.setState({
                    heightCard: 0,
                    marginTopCard: 0,
                    marginBottomCard: 0,
                    })})
    }    

    render() {
    
        const { id, name, quant, total,discount,type} = this.props.item
        return(
        <View style={{marginBottom: hp('1%')}}>
            <TouchableOpacity 
                onPress={()=>{ 
                    this.setState({
                        detailVisible: !this.state.detailVisible},
                        ()=>{
                            this.setState({
                                heightCard: this.state.detailVisible ? hp('44%'): 0,
                                marginTopCard: this.state.detailVisible ? hp('1%'): 0,
                                marginBottomCard: this.state.detailVisible ? hp('2.5%'): 0,
                                })}) }}>
                <View>
                    <View style={styles.container}>
                        <Text style={[styles.textProductDefault, styles.TextGrayProductIndex]}>{id}.</Text>     
                        <Text style={[styles.textProductDefault, styles.TextGrayProduct]} numberOfLines={3}>{name}</Text>
                        <Text style={[styles.textProductDefault, styles.TextGray]}>{quant}</Text>    
                        <Text style={[styles.textProductDefault, styles.TextBlueProduct]} numberOfLines={1}>₹ {formatNumberCommasDecimal(parseFloat(total).toFixed(2))}</Text> 
                    </View>
                    { discount > 0 ?
                    <View style={styles.container}>
                        <Text style={[styles.textProductDefault, styles.TextGrayProductIndex]}></Text>     
                        <Text style={styles.productDetailDiscountLabel}>̶— Discount {type=="%"? `@ ${parseFloat(discount)}%`:null}</Text>
                        <Text style={[styles.textProductDefault, styles.TextGray]}></Text>    
                        <Text style={styles.productDetailDiscountValue}>₹ {type=="%"? formatNumberCommasDecimal(parseFloat(total*discount/100).toFixed(2)):formatNumberCommasDecimal(parseFloat(discount).toFixed(2))}</Text>
                    </View>: null
                    }
                </View>
            </TouchableOpacity>
            {//this.state.detailVisible ? 
            <View style={{height:this.state.heightCard, alignItems:'center',  marginTop:this.state.marginTopCard, marginBottom:this.state.marginBottomCard, width:'100%'}}>
                <ScrollView
                    style={{borderRadius:10, elevation:hp('2%'),}}
                    scrollEnabled={true}
                    keyboardShouldPersistTaps={'handled'}>
    
                    <EditProduct 
                        ref={(editComponent)=>{this.editComponent=editComponent}} 
                        orientation={this.state.orientation}
                        containerStyle={this.state.orientation ? editProductPortrait.containerStyle : editProductLandscape.containerStyle }
                        contentWidth={this.state.orientation ? editProductPortrait.contentWidth : editProductLandscape.contentWidth}
                        cameraButtonContainer={this.state.orientation ? editProductPortrait.cameraButtonContainer : editProductLandscape.cameraButtonContainer}
                        buttonIconSize={this.state.orientation ? '4' : '5'}
                        productNameInputSize={this.state.orientation ? {height:'7.3', width:'46.5'} : {height:'7.3', width:'17.7'}}
                        quantityInputSize={this.state.orientation ? {height:'7.3', width:'71'} : {height:'7.3', width:'28.2'}}
                        priceInputSize={this.state.orientation ? {height:'7.3', width:'71'} : {height:'7.3', width:'28.2'}}
                        discountSelectorSize={this.state.orientation ? {height:'7.3', width:'70'} : {height:'7.3', width:'27.2'}}
                        cancelButtonStyle={this.state.orientation ? editProductPortrait.cancelButtonStyle : editProductLandscape.cancelButtonStyle}
                        saveButtonStyle={this.state.orientation ? editProductPortrait.saveButtonStyle : editProductLandscape.saveButtonStyle}
                        cameraButtonAction={this.openImagePicker.bind(this)}//{()=>alert('Camera not implemented.')}
                        cancelButtonAction={this.closeModal}
                        saveButtonAction={()=>{}}
                        item={this.props.item}
                        imageSource={this.state.imagePath === '' ? null : this.state.imagePath}
                        imageAtributes={{height: this.state.imageHeight, width:this.state.imageWidth}}
                        closeModal={()=>{ 
                            this.setState({
                                detailVisible: !this.state.detailVisible},
                                ()=>{
                                    this.setState({
                                        heightCard: this.state.detailVisible ? hp('44%'): 0,
                                        marginTopCard: this.state.detailVisible ? hp('1%'): 0,
                                        marginBottomCard: this.state.detailVisible ? hp('2.5%'): 0,
                                        })}) }}
                        />
    
                </ScrollView>
            </View>
            }
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center', 
        justifyContent: 'flex-start',
    },
    textProductDefault:{
        color:'#555555',
        fontFamily: "Montserrat-Medium", 
        fontSize:hp('2.1%'),
    },
    TextGrayProductIndex:{
        textAlign:'center',
        width:'15%',
    },
    TextGrayProduct:{
        width:'38%',
        textAlign:'left'
    },
    TextGray:{
        width:'15%',
        textAlign:'center',
    },
    productAmount: {
        width:'32%',
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    TextBlueProduct:{
        color:'#174285',
        width:'32%',
        textAlign:'right',
        fontFamily: "Montserrat-SemiBold",
        paddingRight:hp('2.3%')
    },
    productDetailDiscountContainer:{
        flexDirection:'row', 
        justifyContent:'flex-end', 
        width:'100%', 
        paddingRight:wp('4.4%')
      },
    productDetailDiscountLabel:{  
        color:'#FD853D', 
        fontFamily:'Montserrat-SemiBold', 
        fontSize:hp('1.9%'), 
        width:'38%',
        textAlign:'left'
    },
    productDetailDiscountValue:{
        color:'#FD853D',
        width:'32%',
        textAlign:'right',
        fontFamily: "Montserrat-SemiBold",
        fontSize:hp('1.9%'),
        paddingRight:hp('2.3%')
      },
});
  export default ProductDetail;