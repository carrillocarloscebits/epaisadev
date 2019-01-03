import React, {Component} from 'react';
import {Text, View,TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class Option extends Component{
    
    render() {
        const {label, icon, active, index, handleOption, size,} = this.props
        
        return (
            <TouchableOpacity style={styles.container} onPress={()=>handleOption(index)}>
                <Image source={Icon} style={[activeStyle,styles.img,extrasize, {marginLeft}]}/>      
                <Text style={[activeStyleText,styles.optionText]}>{label}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent:'flex-start',
        alignItems:'center',
      },
      optionText:{
        fontSize: hp('3%'),
        fontFamily: 'Montserrat-SemiBold',
      },
      img:{
        height: hp('4%'),
        width:hp('4%'), 
        marginRight: '6%',
      },
});
