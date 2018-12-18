import React, { Component } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Icons } from "api";
import { TextMontserrat } from "components";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class CardWithHeader extends Component {
  renderCloseButton = () => {
    const {
      closeButton,
      onPressCloseButton,
      closeButtonSize,
      closeButtonColor
    } = this.props;
    if (closeButton) {
      return (
        <TouchableOpacity
          style={styles.closeButtonStyle}
          activeOpacity={0.5}
          onPress={onPressCloseButton}
        >
          <Image source={Icons.close} style={{ width: wp('4.0'), height: wp('4.0')}} />
          {/* <Icon
            name={"close"}
            size={closeButtonSize || 30}
            color={closeButtonColor || "#666"}
          /> */}
        </TouchableOpacity>
      );
    }
  };
  render() {
    const { cardStyles, cardBody, cardHeader, cardHeaderText } = styles;
    const {
      children,
      customCardStyle,
      customBodyStyle,
      headerTitle
    } = this.props;
    return (
      <View style={[cardStyles, customCardStyle]}>
        <View style={cardHeader}>
          <TextMontserrat style={cardHeaderText}>{headerTitle}</TextMontserrat>
          {this.renderCloseButton()}
        </View>
        <View style={[cardBody, customBodyStyle]}>{children}</View>
      </View>
    );
  }
}

const styles = {
  cardStyles: {
    borderRadius: 15,
    backgroundColor: "white"
  },
  cardBody: {
    padding: 0
  },
  cardHeader: {
    padding: 8,
    borderColor: "#979797",
    borderBottomWidth: 3,
    justifyContent: "center",
    alignItems: "center"
  },
  cardHeaderText: {
    fontWeight: "bold",
    fontSize: wp('5.0'),
    color: "#47525d"
  },
  closeButtonStyle: {
    position: "absolute",
    right: 12,
    top:hp('1.8%')
  }
};

export default CardWithHeader;