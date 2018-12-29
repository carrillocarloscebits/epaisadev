import React, { Component } from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';
import { TextMontserrat, ButtonGradient, Card } from 'components';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
class Alert extends Component {
  render() {
    const { style, message, buttonTitle, onPress } = this.props;

    const styles = EStyleSheet.create({
      alertContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        ...style,
      },
      messageContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
      },
      containerButton: {
        width: '100%',
        alignItems: 'center',
        // marginTop: 30,
        // marginBottom: 20,
      },
      button: {
        width: '75%',
      },
      textStyle: {
        fontSize: '1.8rem',
        textAlign: 'center',
        fontWeight: '700',
        color: '#4e5965',
        width: '100%',
      },
      buttonStyle: {
        width: '100%',
      },
      card: {
        paddingHorizontal: '3rem',
        paddingBottom: '2rem',
      },
      '@media (min-width: 500)': {
        $width: 320,
        card: {
          width: '$width',
          paddingHorizontal: '2.5rem',
          paddingBottom: '1.5rem',
        },
      },
      '@media (min-width: 320) and (max-width: 500)': {
        $scale: 1,
        $width: '85%',
        card: {
          width: '$width',
        },
      },
    });
    const {
      alertContainer,
      messageContainer,
      textStyle,
      card,
      containerButton,
      button,
    } = styles;
    return (
      <Modal
        onRequestClose={() => {}}
        transparent={true}
        visible={true}
        presentationStyle="overFullScreen"
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(47, 49, 51, 0.6)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          activeOpacity={1}
        >
          <Card style={card}>
            <View style={messageContainer}>
              {message.map((element, i) => {
                return (
                  <TextMontserrat key={i} style={textStyle}>
                    {element}
                  </TextMontserrat>
                );
              })}
            </View>
            <View style={containerButton}>
              <View style={button}>
                <ButtonGradient title={buttonTitle} onPress={onPress} />
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export { Alert };
