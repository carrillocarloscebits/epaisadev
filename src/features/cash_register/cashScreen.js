import React, { Component } from 'react';
import {Keyboard, View, StyleSheet } from 'react-native';
import Header from './components/Header/header';
import TotalAmount from './components/TotalAmount/totalAmount';
import ItemsContainer from './components/ItemsContainer/itemsContainer';
import Calculator from './components/Calculator/Calculator';
import Footer from './components/Footer/footer';
import colors from './styles/colors';
import Orientation from 'react-native-orientation-locker';
import { connect } from 'react-redux';
import { cashActions } from './actions';
import SideBar from '../left_sidebar/sideBar';
import RightSideBar from './components/RightSideBar/rightSideBar';
import Drawer from 'react-native-drawer';
import ModalDiscount from '../modal_discount/modalDiscount';
import ModalDelivery from '../modal_delivery/modalDelivery';
import ModalOptions from './components/Modals/ModalOptions/modalOptions';
import { isTablet } from './constants/isLandscape';
import ModalCustomer from '../modal_customer/modalCustomer';
import { LOGIN } from '../../navigation/screen_names';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

let keyboard = "100%"
const isPhone = !isTablet;
class CashScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  keyboard= false;
  state = {
    modalOptions: false,
    modalActive: false,
    modalRight: false,
    modalDiscount: false,
    modalDelivery: false,
    modalCustomer: false,
    keyboard: false,
  };
  componentWillMount() {
    isPhone ? Orientation.lockToPortrait() : Orientation.lockToLandscape();
  }
  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }
  _keyboardDidShow () {
    keyboard=hp("100%")
    
  }

  _keyboardDidHide () {
    keyboard="100%"
  }
  // ACTIONS REDUX
  sumAmount = value => {
    const { sum_amo } = this.props;
    sum_amo(value);
    this.setState({
      modalOptions: false,
    });
  };
  sumTotal = () => {
    const { sum_tot, amount } = this.props;
    sum_tot();
    this.setState({
      modalOptions: false,
    });
  };
  cleanTotal = () => {
    const { clear } = this.props;
    clear();
    this.setState({
      modalOptions: false,
    });
  };
  backAmount = () => {
    const { back } = this.props;
    back();
    this.setState({
      modalOptions: false,
    });
  };
  addDiscount = value => {
    const { discount } = this.props;
    discount(value);
    this.setState({
      modalDiscount: false,
    });
  };
  addDelivery = value => {
    const { delivery } = this.props;
    delivery(value);
    this.setState({
      modalDelivery: false,
    });
  };
  removeDiscount = () => {
    const { remove_discount } = this.props;
    remove_discount();
  };
  removeDelivery = () => {
    const { remove_delivery } = this.props;
    remove_delivery();
  };
  //MODALS AND DRAWERS
  closeControlPanel = () => {
    this._drawer.close();
    this.setState({
      modalOptions: false,
    });
  };
  openControlPanel = () => {
    this._drawer.open();
    this.setState({
      modalOptions: false,
    });
  };
  toggleRight = () => {
    this.setState({
      modalRight: !this.state.modalRight,
      modalOptions: false,
    });
  };
  toggleSideBar = () => {
    this.setState({
      modalActive: !this.state.modalActive,
      modalOptions: false,
    });
  };
  changeOption = value => {
    const { change } = this.props;
    change(value);
  };
  toggleModalOptions = () => {
    this.setState({
      modalOptions: !this.state.modalOptions,
    });
  };
  toggleModalDiscount = () => {
    this.setState({
      modalOptions: false,
      modalDiscount: !this.state.modalDiscount,
    });
  };
  toggleModalDelivery = () => {
    this.setState({
      modalOptions: false,
      modalDelivery: !this.state.modalDelivery,
    });
  };
  toggleModalCustomer = () => {
    this.setState({
      modalOptions: false,
      modalCustomer: !this.state.modalCustomer,
    });
  };
  logout = () => {
    this.props.navigation.navigate(LOGIN);
  };
  render() {
    const {
      amount,
      total_amount,
      products,
      sideOption,
      totalDiscount,
      totalDelivery,
      type,
    } = this.props.state;
    const opa = this.state.modalActive || this.state.modalRight ? true : false;
    console.log(keyboard)
    return (
      <Drawer
        ref={ref => (this._drawer2 = ref)}
        type="overlay"
        side="left"
        tapToClose={true}
        open={this.state.modalActive}
        openDrawerOffset={isPhone ? 0.22 : 0.73}
        onClose={() => {
          this.setState({ modalActive: false });
        }}
        content={
          //LEFT SIDE BAR
          <SideBar
            logoutAction={this.logout}
            handleOption={this.changeOption}
            active={this.state.modalActive}
            toggle={this.toggleSideBar}
            sideOption={sideOption}
          />
        }
      >
        {isPhone ? (
          <Drawer
            ref={ref => (this._drawer = ref)}
            type="overlay"
            side="right"
            tapToClose={true}
            open={this.state.modalRight}
            onClose={() => {
              this.setState({ modalRight: false });
            }}
            openDrawerOffset={0.1}
            content={
              //RIGHT SIDE BAR
              <RightSideBar
                type={type}
                products={products}
                discount={totalDiscount}
                delivery={totalDelivery}
                subtotal={total_amount}
                actionClose={this.closeControlPanel}
                openDiscount={this.toggleModalDiscount}
                openDelivery={this.toggleModalDelivery}
                removeDiscount={this.removeDiscount}
                removeDelivery={this.removeDelivery}
              />
            }
          >
            {
              //MAIN VIEW
            }
            <View style={[styles.container, {height:keyboard}]}>
              <Header
                label="CASH REGISTER"
                cant={products.length}
                toggleSide={this.toggleSideBar}
                toggleRight={this.toggleRight}
                toggleOptions={this.toggleModalOptions}
              />

              <TotalAmount value={total_amount} products={products} />
              <ItemsContainer />
              <Calculator
                amount={amount}
                sumAmount={this.sumAmount}
                sumTotal={this.sumTotal}
                cleanTotal={this.cleanTotal}
                backAmount={this.backAmount}
              />
              <Footer toggleModal={this.toggleModalCustomer} />
              {opa ? <View style={styles.opacity} /> : null}
              {this.state.modalOptions ? (
                <ModalOptions
                  openDiscount={this.toggleModalDiscount}
                  openDelivery={this.toggleModalDelivery}
                />
              ) : null}
              <ModalDiscount
                widthModal="40%"
                active={this.state.modalDiscount}
                closeModal={this.toggleModalDiscount}
                addDiscount={this.addDiscount}
              />
              <ModalDelivery
                widthModal="40%"
                active={this.state.modalDelivery}
                closeModal={this.toggleModalDelivery}
                addDelivery={this.addDelivery}
              />
              <ModalCustomer
                widthModal="50%"
                active={this.state.modalCustomer}
                closeModal={this.toggleModalCustomer}
              />
            </View>
          </Drawer>
        ) : (
          <View style={styles.containerLandscape}>
            <View style={[styles.container, isTablet? {flex:1}:null, {height:keyboard}]}>
              <Header
                label="CASH REGISTER"
                cant={products.length}
                toggleSide={this.toggleSideBar}
                toggleRight={this.toggleRight}
                toggleOptions={this.toggleModalOptions}
              />

              <ItemsContainer />
              <Calculator
                amount={amount}
                sumAmount={this.sumAmount}
                sumTotal={this.sumTotal}
                cleanTotal={this.cleanTotal}
                backAmount={this.backAmount}
              />

              <ModalDiscount
                isLandscape={true}
                widthModal="50%"
                active={this.state.modalDiscount}
                closeModal={this.toggleModalDiscount}
                addDiscount={this.addDiscount}
              />
              <ModalDelivery
                isLandscape={true}
                widthModal="50%"
                active={this.state.modalDelivery}
                closeModal={this.toggleModalDelivery}
                addDelivery={this.addDelivery}
              />
              <ModalCustomer
                widthModal="60%"
                active={this.state.modalCustomer}
                closeModal={this.toggleModalCustomer}
              />
            </View>
            <RightSideBar
              type={type}
              products={products}
              discount={totalDiscount}
              delivery={totalDelivery}
              subtotal={total_amount}
              actionClose={this.closeControlPanel}
              openDiscount={this.toggleModalDiscount}
              openDelivery={this.toggleModalDelivery}
              removeDiscount={this.removeDiscount}
              removeDelivery={this.removeDelivery}
            />
            {opa ? <View style={styles.opacity} /> : null}
          </View>
        )}
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.darkWhite,
  },
  containerLandscape: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    backgroundColor: colors.darkWhite,
  },
  opacity: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: colors.opacityDin(0.5),
  },
  drawerRightContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
});

const mapStateToProps = state => ({
  state: state.cashData,
});

const mapDispatchToProps = dispatch => ({
  sum_amo: val => {
    return dispatch(cashActions.sum_amount(val));
  },
  sum_tot: () => {
    return dispatch(cashActions.sum_total());
  },
  clear: () => {
    return dispatch(cashActions.clear_amount());
  },
  back: () => {
    return dispatch(cashActions.back_amount());
  },
  change: val => {
    return dispatch(cashActions.change_option(val));
  },
  discount: val => {
    return dispatch(cashActions.add_discount(val));
  },
  delivery: val => {
    return dispatch(cashActions.add_delivery(val));
  },
  remove_discount: () => {
    return dispatch(cashActions.remove_discount());
  },
  remove_delivery: () => {
    return dispatch(cashActions.remove_delivery());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CashScreen);
