import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
  SectionList,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { Colors } from 'api';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FloatingTextInput } from './index';
import { CountryItem } from './components';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import flags from './api/flags';
import { countries } from './api/countries';
import { letters } from './api/letters';
import { letterIndexes, sections } from './api/sections';
import { get_user_country } from '../../services/user_service';

class PhoneInput extends Component {
  state = {
    touched: false,
    isModalVisible: false,
    letterIndexes: {},
    phone: '',
    countries: [],
    sections: [],
    dataToShow: [],
    selectedCountry: {
      flag: 'https://www.countryflags.io/af/flat/64.png',
      callingCodes: ['93'],
      name: 'Afghanistan',
      alpha2Code: 'AF',
    },
  };
  componentDidMount() {
    console.log('PHONE INPUT');
    get_user_country().then(x => {
      this.setState({
        selectedCountry: {
          flag: x.location.country_flag,
          callingCodes: [x.location.calling_code],
          name: x.country_name,
          alpha2Code: x.country_code,
        },
      });
    });

    this.setState({
      sections: sections,
      countries: countries,
      dataToShow: sections,
      letterIndexes,
    });
  }

  getItemLayout = sectionListGetItemLayout({
    // The height of the row with rowData at the given sectionIndex and rowIndex
    getItemHeight: () => 36,
    getSeparatorHeight: () => 12,
  });

  getLettersArr = () => {
    const letters = [];
    const { letterIndexes } = this.state;

    for (let key in letterIndexes) {
      letters.push(letterIndexes[key]);
    }
    return letters;
  };

  handleSearch = term => {
    let matchedItemsArray = [];
    if (term === '') {
      this.setState({
        search: false,
        dataToShow: this.state.sections,
      });
    } else {
      this.state.countries.map(item => {
        if (item.name.toLowerCase().includes(term.toLowerCase())) {
          matchedItemsArray.push(item);
        }
      });
      this.setState({
        search: true,
        dataToShow: [
          {
            title: `Results for "${term}"`,
            data: matchedItemsArray,
          },
        ],
      });
    }
  };

  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  _selectCountryCode = item => {
    this.setState(
      {
        selectedCountry: item,
        touched: true,
      },
      this.onChange({
        alpha2Code: item.alpha2Code,
        callingCode: item.callingCodes[0],
        phone: this.state.phone,
      })
    );
  };

  _changeText = v => {
    console.log(/^\d+$/.test(v));
    if (/^\d+$/.test(v)) {
      this.setState({ phone: 123 });
      this.onChange({
        alpha2Code: this.state.selectedCountry.alpha2Code,
        callingCode: this.state.selectedCountry.callingCodes[0],
        phone: v,
      });
    }
  };

  onChange = payload => {
    if (this.props.onChange) {
      this.props.onChange(payload);
    }
  };

  render() {
    const { callingCodes, flag, name, alpha2Code } = this.state.selectedCountry;
    const { label } = this.props;
    const { phone } = this.state;
    const text = label || 'Mobile';
    const {
      modalContainer,
      modalHeader,
      countryCodeContainer,
      modalHeaderText,
      modalCloseButton,
    } = styles;
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <FloatingTextInput
            ref={this.props.inputRef}
            label={text}
            phone={true}
            keyboardType="numeric"
            value={phone}
            onlyNumbers
            onChangeText={this._changeText}
            focus={this.state.touched}
            maxLength={10}
            topper={-5}
            {...this.props}
          >
            <TouchableOpacity onPress={this._toggleModal}>
              <View style={countryCodeContainer}>
                <View>
                  <Image
                    source={flags[alpha2Code]}
                    style={{ width: 30, height: 25 }}
                  />
                </View>
                <View style={{ paddingHorizontal: 5 }}>
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: 'bold',
                      color: '#6b6b6b',
                      bottom: 2,
                    }}
                  >{`+${callingCodes[0]}`}</Text>
                </View>

                {/*<View>
                  <Icon name={'angle-down'} size={25} />
                </View>*/}
              </View>
            </TouchableOpacity>
          </FloatingTextInput>
        </View>

        <Modal
          isVisible={this.state.isModalVisible}
          style={{ margin: 0 }}
          swipeDirection={'down'}
          onSwipe={this._toggleModal}
        >
          <View style={modalContainer}>
            <View style={modalHeader}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    margin: width > 400 ? 25 : 15,
                  }}
                >
                  <Text style={modalHeaderText}>
                    Select Country/region code
                  </Text>
                </View>
                <View style={modalCloseButton}>
                  <TouchableOpacity onPress={this._toggleModal}>
                    <Icon
                      name={'close'}
                      size={width > 400 ? 30 : 24}
                      color={'white'}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{
                  width: '94%',
                  backgroundColor: 'white',
                  marginBottom: 25,
                  borderRadius: 12,
                  flexDirection: 'row',
                }}
              >
                <View
                  style={{
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon name={'search'} size={25} color={Colors.primary} />
                </View>
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <TextInput
                    placeholderTextColor={Colors.primary}
                    placeholder="Search..."
                    style={{
                      fontSize: 20,
                    }}
                    onChangeText={term => this.handleSearch(term)}
                  />
                </View>
                <View
                  style={{
                    width: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon name={'close'} size={20} color={Colors.primary} />
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                marginLeft: 20,
                flex: 1,
                height: '100%',
                marginBottom: 48,
              }}
            >
              <CountryItem
                flag={flag}
                selected={true}
                alpha2Code={alpha2Code}
                name={name}
                callingCode={callingCodes[0]}
              />
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <SectionList
                  ref={component => (this.myFlatList = component)}
                  sections={this.state.dataToShow}
                  keyExtractor={(item, index) => `${item.name}_${index}`}
                  renderSectionHeader={({ section: { title } }) => (
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#aaaaaa',
                      }}
                    >
                      {title}
                    </Text>
                  )}
                  renderItem={({
                    item,
                    item: { flag, name, callingCodes, alpha2Code },
                  }) => (
                    <CountryItem
                      flag={flag}
                      name={name}
                      alpha2Code={alpha2Code}
                      callingCode={callingCodes[0]}
                      onPress={() => this._selectCountryCode(item)}
                    />
                  )}
                  getItemLayout={this.getItemLayout}
                />
                <ScrollView
                  style={{
                    position: 'absolute',
                    right: 0,
                    paddingHorizontal: 10,
                    width: 35,
                    flex: 1,
                    height: '100%',
                    backgroundColor: 'white',
                  }}
                >
                  {this.getLettersArr().map(({ letter, index }) => (
                    <TouchableWithoutFeedback
                      key={`letter_${letter}_${index}`}
                      onPress={() => {
                        this.myFlatList.scrollToLocation({
                          itemIndex: 0,
                          sectionIndex: index,
                        });
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 'bold',
                          color: Colors.primary,
                        }}
                      >
                        {letter}
                      </Text>
                    </TouchableWithoutFeedback>
                  ))}
                </ScrollView>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const width = Dimensions.get('window').width;

const styles = {
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    width: '100%',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    position: 'relative',
    elevation: 8,
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowColor: 'black',
    shadowOpacity: 1,
  },
  modalCloseButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeaderText: {
    color: 'white',
    fontSize: width > 400 ? 24 : 18,
    fontWeight: 'bold',
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
};

export default PhoneInput;
