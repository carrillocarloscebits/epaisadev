import React, { Component } from 'react';
import { View } from 'react-native';
import { Card } from '../cards';
import { FloatingTextEditProductInput } from './components/text_inputs/index';
import {
  ButtonGradient,
  ButtonOutline,
  ButtonCamera,
} from './components/buttons';
import { SelectorDiscount } from './components/selectors/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

//REDUX IMPLEMENTATION
import { connect } from 'react-redux';
import { editProductAction } from './actions';

import { cashActions } from '../../actions';

class EditProduct extends Component {
  state = {
    rupeeSign: '₹ ',
    name: '',
    quantity: '',
    price: '',
    discount: '',
    image: '',

    tempName: '',
    tempQuantity: '',
    tempDiscount: '',
    tempImage: '',

    products: [],
    //error vars
    ename: false,
    equantity: false,
    eprice: false,
    ediscount: false,
    allow:false
  };

  render() {
    const {
      containerStyle,
      contentWidth,
      cameraButtonContainer,
      buttonIconSize,
      cameraButtonAction,
      productNameInputSize,
      quantityInputSize,
      priceInputSize,
      discountSelectorSize,
      cancelButtonStyle,
      cancelButtonAction,
      saveButtonStyle,
      saveButtonAction,
      orientation,
      imageSource,
      imageAtributes,
    } = this.props;

    const saveButtonTextStyle = {
      fontWeight: '700',
      fontSize: hp('1.85%'),
      color: '#fff',
      letterSpacing: wp('0.25%'),
    };
    const cancelButtonTextStyle = {
      fontWeight: '700',
      fontSize: hp('1.85%'),
      color: '#b30000',
      letterSpacing: wp('0.25%'),
    };

    ejemplo = () => {
      alert(
        this.name.state.value +
          ' - ' +
          this.quantity.state.value +
          ' - ' +
          this.price.state.value +
          ' - ' +
          this.discount.state.discountSign +
          ' - ' +
          this.discount.state.discount
      );
    };

    setProduct = () => {
      if (
        this.name.state.value === '' ||
        this.quantity.state.value === '' ||
        this.price.state.value === '' ||
        ((parseFloat(this.discount.state.discount)>99.99 && this.discount.state.discountSign === '%') || parseFloat(this.discount.state.discount)<=0) ||
        imageSource === ''
      ) {
        if(this.name.state.value === '') this.setState({ename:true});
        else this.setState({ename:false});
        if(this.quantity.state.value === '') this.setState({equantity:true})
        else this.setState({equantity:false});
        if(this.price.state.value === '') this.setState({eprice:true});
        else this.setState({eprice:false});
        if(parseFloat(this.discount.state.discount)>99.99 || parseFloat(this.discount.state.discount)<=0) {this.setState({ediscount:true});}
        else this.setState({ediscount:false});
        if(parseFloat(this.discount.state.discount)>99.99 || parseFloat(this.discount.state.discount)<=0) {this.setState({allow:true});}
        else this.setState({allow:false});
        return;
      }
      
      this.setState({
        ename:false,
        equantity:false,
        eprice:false,
        ediscount:false
      });
      let product = {
        ...this.props.item,
        name: this.name.state.value,
        quant: this.quantity.state.value,
        unitPrice: parseFloat(this.price.state.value).toFixed(2),
        type: this.discount.state.discountSign,
        discount:
          this.discount.state.discount !== ''
            ? parseFloat(this.discount.state.discount).toFixed(2)
            : 0,
        total: parseFloat(
          parseFloat(this.quantity.state.value).toFixed(2) *
            parseFloat(this.price.state.value).toFixed(2)
        ).toFixed(2),
        image: imageSource ? imageSource : '',
      };

      const { edit_product } = this.props;
      edit_product(product);

      
      saveEditingState();
      const { closeModal } = this.props;
      closeModal();
    };

    saveEditingState = () => {
      this.setState({
        name: this.name.state.value,
        quantity: this.quantity.state.value,
        price: this.price.state.value,
        discount: this.discount.state.discount,
        image: imageSource,
      });
    };

    {
      console.log(this.props.item);
    }
    return (
      <Card style={containerStyle}>
        <View
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <View style={contentWidth}>
            <View
              style={{
                height: hp('10.4%'),
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-end',
                backgroundColor: '#fff',
              }}
            >
              <View style={cameraButtonContainer}>
                <ButtonCamera
                  containerStyle={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 5,
                  }}
                  imageSize={buttonIconSize}
                  onPress={cameraButtonAction}
                  imageSource={imageSource}
                  imageAtributes={imageAtributes}
                />
              </View>
              <FloatingTextEditProductInput
                width={productNameInputSize.width}
                height={productNameInputSize.height}
                error={this.state.ename}
                labelText={'Product Name'}
                value={this.props.item.name}
                eraseOption={false}
                autoCapitalizeText={'words'}
                orientation={orientation}
                ref={name => {
                  this.name = name;
                }}
                //firstValue={this.state.name}
              />
            </View>
            <FloatingTextEditProductInput
              width={quantityInputSize.width}
              height={quantityInputSize.height}
              error={this.state.equantity}
              labelText={'Quantity'}
              typeOfKeyboard={'numeric'}
              value={this.props.item.quant}
              eraseOption={false}
              autoCapitalizeText={'words'}
              orientation={orientation}
              ref={quantity => {
                this.quantity = quantity;
              }}
              //firstValue={this.state.quantity}
            />
            <FloatingTextEditProductInput
              width={priceInputSize.width}
              height={priceInputSize.height}
              error={this.state.eprice}
              labelText={'Price (₹)'}
              value={this.props.item.unitPrice}
              typeOfKeyboard={'numeric'}
              eraseOption={true}
              autoCapitalizeText={'words'}
              orientation={orientation}
              rupeeSign={true}
              ref={price => {
                this.price = price;
              }}
            />
            <View
              style={{
                width: wp(discountSelectorSize.width + '%'),
                height: hp(discountSelectorSize.height + '%'),
                paddingLeft: wp('1%'),
              }}
            >
              <SelectorDiscount
                error={this.state.ediscount}
                width={discountSelectorSize.width}
                orientation={this.props.orientation}
                ref={discount => {
                  this.discount = discount;
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: '100%',
              height: hp('6.5%'),
              marginTop: hp('2.7%'),
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <ButtonOutline
              title={'CANCEL'}
              buttonCustomStyle={cancelButtonStyle}
              buttonTextStyle={cancelButtonTextStyle}
              onPress={cancelButtonAction}
            />
            <ButtonGradient
              title={'SAVE'}
              linearGradientStyle={saveButtonStyle}
              buttonTextStyle={saveButtonTextStyle}
              onPress={setProduct}
            />
          </View>
        </View>
      </Card>
    );
  }
}

const mapStateToProps = state => {
  console.log('index editproduct');
  console.log(state);
  return {
    products: state.cashData.product,
  };
};

const mapDispatchToProps = dispatch => ({
  edit_product: product => {
    dispatch(cashActions.edit_product(product));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProduct);
//export default EditProduct;
