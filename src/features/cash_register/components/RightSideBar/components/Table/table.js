
import React, { Component } from 'react';
import { Dimensions,View, Text, StyleSheet, ImageBackground,TouchableOpacity,Image} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Headers from './components/headers';
import List from './components/list';
import AddItems from './components/addItems';

class Table extends Component {
    render() {
        const {data} = this.props
        return (
            <View style={styles.container}>
                <Headers/>
                {
                    data.length > 0?
                    <List data={data}/>:
                    <AddItems/>
                }
            </View>      
        );
    }
}

const styles = StyleSheet.create({
    container: {
          flex:6,
          flexDirection:'column',
    },
});

export default Table;