import React, {Component} from 'react';
import {Dimensions,View, Text, StyleSheet, ImageBackground, Modal} from 'react-native';
import Header from './components/Header/header'
import TotalAmount from './components/TotalAmount/totalAmount'
import ItemsContainer from './components/ItemsContainer/itemsContainer'
import Calculator from './components/Calculator/Calculator'
import Footer from './components/Footer/footer';
import colors from './styles/colors'
import { connect } from 'react-redux';
import { cashActions } from './actions';
import SideBar from './components/LeftSideBar/sideBar'
import RightSideBar from './components/RightSideBar/rightSideBar'
import Drawer from 'react-native-drawer'
import {CardWithHeader} from "../../components"
import ModalDiscount from './components/Modals/ModalDiscount/modalDiscount';
import ModalDelivery from './components/Modals/ModalDelivery/modalDelivery';
import ModalOptions from './components/Modals/ModalOptions/modalOptions';
class CashScreen extends Component{
  static navigationOptions = {
    header: null
  }
  state = {
    modalOptions: false,
    modalActive: false,
    modalRight: false,
    modalDiscount:true,
    modalDelivery:false,

  }
  
  closeControlPanel  = () => {
    this._drawer.close()
  };
  openControlPanel = () => {
    this._drawer.open()
  };
  toggleRight=()=>{
    this.setState({
      modalRight: !this.state.modalRight
    })
  }
  sumAmount=(value)=>{
      const {sum_amo}=this.props
      sum_amo(value)
  }
  sumTotal=()=>{
      const {sum_tot, amount}=this.props
      sum_tot()
  }
  cleanTotal=()=>{
      const {clear}=this.props
      clear()
  }
  backAmount=()=>{
      const {back}=this.props
      back()
  }
  addDiscount=(value)=>{
    const {discount}=this.props
    discount(value)
    this.setState({
      modalDiscount:false,
    })
  }
  toggleSideBar=()=>{
    this.setState({
      modalActive: !this.state.modalActive
    })
  }
  changeOption=(value)=>{
    const {change}=this.props
    change(value)
  }
  toggleModalOptions=()=>{
    this.setState({
      modalOptions:!this.state.modalOptions
    })
  }
  toggleModalDiscount=()=>{
    this.setState({
      modalOptions: false,
      modalDiscount:!this.state.modalDiscount,
    })
  }
  toggleModalDelivery=()=>{
    this.setState({
      modalOptions: false,
      modalDelivery:!this.state.modalDelivery,
    })
  }
  render() {
    const {amount, total_amount,data, sideOption,totalDiscount,totalDelivery, type} = this.props.state
    const opa= this.state.modalActive || this.state.modalRight? true: false
    
    return (
      <Drawer
          ref={(ref) => this._drawer2 = ref} type="overlay" side="left" tapToClose={true}
          open={this.state.modalActive} openDrawerOffset={0.22} 
          onClose={()=>{this.setState({modalActive: false})}}
          content={
            <SideBar handleOption={this.changeOption} active={this.state.modalActive} toggle={this.toggleSideBar} sideOption={sideOption}/>  
          }
      >
      <Drawer
          ref={(ref) => this._drawer = ref} type="overlay" side="right" tapToClose={true}
          open={this.state.modalRight} onClose={()=>{this.setState({modalRight: false})}}
          openDrawerOffset={0.1} 
          content={
              <RightSideBar type={type} data={data} discount={totalDiscount} delivery={totalDelivery} subtotal={total_amount} actionClose={this.closeControlPanel}/> 
          }
      >
        <View style={styles.container}>
          
          
          <Header label="CASH REGISTER" cant={data.length} toggleSide={this.toggleSideBar} toggleRight={this.toggleRight} toggleOptions= {this.toggleModalOptions}/>
          <TotalAmount value={total_amount}/>
          <ItemsContainer/>
          <Calculator amount={amount} sumAmount={this.sumAmount} sumTotal={this.sumTotal} cleanTotal={this.cleanTotal} backAmount={this.backAmount}/>
          <Footer/>
          {
            opa?
            <View style={styles.opacity}>

            </View>:null

          }
          { this.state.modalOptions?
            <ModalOptions openDiscount={this.toggleModalDiscount} openDelivery={this.toggleModalDelivery}/>:null
          }
          <ModalDiscount active={this.state.modalDiscount} closeModal={this.toggleModalDiscount} addDiscount={this.addDiscount}/>
          <ModalDelivery active={this.state.modalDelivery} closeModal={this.toggleModalDelivery}/>
        </View>
      </Drawer>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.darkWhite,
  },
  opacity:{
    position:'absolute',
    top:0,
    left:0,
    width: '100%',
    height:'100%',
    backgroundColor: colors.opacityDin(0.5)
  },
  drawerRightContainer: {
    width: '100%',
    height: '100%',
    backgroundColor:'red',
  },
  backgroundImage: {
  position: 'absolute',
  width:'100%',
  height:'100%',
  backgroundColor: 'red'
  },
});

const mapStateToProps = (state) =>(
{
  state: state.cashData,
})

const mapDispatchToProps = (dispatch) =>({
  sum_amo: (val) => {
    return dispatch(cashActions.sum_amount(val))
  },
  sum_tot: () => {
    return dispatch(cashActions.sum_total())
  },
  clear: () => {
    return dispatch(cashActions.clear_amount())
  },
  back: () => {
    return dispatch(cashActions.back_amount())
  },
  change: (val) => {
    return dispatch(cashActions.change_option(val))
  },
  discount: (val) => {
    return dispatch(cashActions.add_discount(val))
  }

})

export default connect(mapStateToProps, mapDispatchToProps)(CashScreen)