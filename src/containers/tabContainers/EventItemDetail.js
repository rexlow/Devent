import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import { connect } from 'react-redux';
import * as actions from './../../actions';

import { Actions } from 'react-native-router-flux';
import ButtonComponent from 'react-native-button-component';

import ActionButton from 'react-native-action-button';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const shoppingCart = (<MaterialIcon name="shopping-cart" size={27} color="white" />)

import Icon from 'react-native-vector-icons/FontAwesome';
const university = (<Icon name="university" size={13} color="black" />)
const creditCard = (<Icon name="credit-card" size={13} color="black" />)
const calendar = (<Icon name="calendar" size={13} color="black" />)
const clock = (<Icon name="clock-o" size={13} color="black" />)
const user = (<Icon name="user" size={13} color="black" />)
const location = (<Icon name="location-arrow" size={13} color="black" />)
const signIn = (<Icon name="sign-in" size={26} color="black" />)

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class EventItemDetail extends Component {

  componentWillReceiveProps(nextProps) {
    this.buyTicketCallback(nextProps);
  }

  buyTicketHelper() {
    const { title, cost, uid, profile } = this.props;
    Alert.alert(
      'Purchase',
      `Buy 1 ticket for ${title} \n with USD ${cost}?`,
      [
        {text: 'Yes', onPress: () => {
          if (profile.userGroup.credit >= cost) {
            const remainingCredit = profile.userGroup.credit - cost
            this.props.buyTicket(uid, remainingCredit);
          } else {
            Alert.alert(
              'Error', 'Insufficient credit'
            )
          }
        }},
        {text: 'Cancel', onPress: () => console.log('Buy ticket cancel')}
      ]
    )
  }

  buyTicketCallback(props) {
    if (props.api.message) {
      const message = props.api.message.message;
      Alert.alert(
        'Message',
        message,
      [
        {text: 'Return', onPress: () => console.log('Return after ticket reducer')}
      ]);
    }
  }

  render() {
    const { address, artwork, cost, date, logo, joinedUserCount,
            title, organizer, note, time } = this.props;
    const userCount = _.size(this.props.joinedUser);
    const { centerEverything, container, imageContainer, contentContainer, titleContainer,
      actionButtonContainer, actionButtonRow, actionButtonItem, addressActionButtonItem, noteContainer,
      titleStyle, imageStyle, textStyle } = styles;

    return(
      <View style={[centerEverything, container]}>
        <View style={imageContainer}>
          <Image
            style={imageStyle}
            source={{uri: artwork}}
          />
        </View>
        <View style={[contentContainer]}>
          <View style={[centerEverything, titleContainer]}>
            <Text style={titleStyle}>{title}</Text>
          </View>

          <View style={[actionButtonContainer]}>
            <View style={[actionButtonRow]}>
              <View style={[actionButtonItem]}>
                {university}
                <Text style={textStyle}>  {organizer}</Text>
              </View>
              <View style={[actionButtonItem]}>
                {user}
                <Text style={textStyle}>  {userCount}</Text>
              </View>
            </View>
            <View style={[actionButtonRow]}>
              <View style={[actionButtonItem]}>
                {calendar}
                <Text style={textStyle}>  {date}</Text>
              </View>
              <View style={[actionButtonItem]}>
                {clock}
                <Text style={textStyle}>  {time}</Text>
              </View>
            </View>
            <View style={[actionButtonRow]}>
              <View style={[actionButtonItem]}>
                {creditCard}
                <Text style={textStyle}>  USD {cost}</Text>
              </View>
              <View style={[actionButtonItem]}>
                <View>
                  {location}
                </View>
                <View style={{ flex: 1, flexWrap: 'wrap' }}>
                  <Text style={textStyle}>  {address}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[noteContainer]}>
            <Text>{note}</Text>
          </View>
        </View>
        <ActionButton
          buttonColor="rgba(139,195,74,1)"
          offsetY={0}
          offsetX={0}
          icon={shoppingCart}
          onPress={this.buyTicketHelper.bind(this)} />
      </View>
    )
  }
}

const styles = {
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    marginTop: 64
  },
  imageContainer: {
    // position: 'absolute',
    top: 0
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center'
  },
  titleContainer: {
    flex: 1,
    width: deviceWidth,
    backgroundColor: 'transparent',
    padding: 5
  },
  actionButtonContainer: {
    flex: 3,
    flexDirection: 'column'
  },
  actionButtonRow: {
    flexDirection: 'row'
  },
  actionButtonItem: {
    flex: 5,
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 10,
  },
  addressActionButtonItem: {
    flex: 5,
    padding: 5,
    paddingLeft: 10,
  },
  noteContainer: {
    flex: 6,
    padding: 10
  },
  titleStyle: {
    fontSize: 24,
    letterSpacing: 1,
    fontFamily: 'HelveticaNeue-Medium',
    textAlign: 'center',
  },
  imageStyle: {
    width: deviceWidth,
    height: 150
  },
  textStyle: {
    fontSize: 12,
  }
};

const mapStateToProps = (state) => {
  return {
    api: state.api,
    profile: state.profile
  }
}

export default connect(mapStateToProps, actions)(EventItemDetail);
