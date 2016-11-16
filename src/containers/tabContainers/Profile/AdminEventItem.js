import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import Icon from 'react-native-vector-icons/FontAwesome';
const check = (<Icon name="check" size={28} color="green" />)
const close = (<Icon name="close" size={28} color="red" />)
const signIn = (<Icon name="sign-in" size={28} color="black" />)

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class AdminEventItem extends Component {

  renderApproveText() {
    if (this.props.event.approved) {
      return <Text style={styles.approvedTextStyle}>Approval Status: True</Text>;
    } else {
      return <Text style={styles.approvedTextStyle}>Approval Status: False</Text>;
    }
  }

  renderApproveButton() {
    if (this.props.event.approved) {
      return;
    } else {
      return (
        <View>
          <TouchableWithoutFeedback onPress={() => Actions.eventItemDetail()}>
            {check}
          </TouchableWithoutFeedback>
        </View>
      )
    }
  }

  render() {
    const { address, artwork, cost, date, joinedUserCount,
            title, organizer, note, time, approved } = this.props.event;

    const userCount = _.size(this.props.event.joinedUser);

    const { skeleton, centerEverything, container, imageContainer, contentContainer, textContainer,
            buttonContainer, imageStyle, titleStyle } = styles;
    return(
      <TouchableWithoutFeedback onPress={() => console.log('admin ')}>
        <View style={container}>
          <View style={imageContainer}>
            <Image
              source={{uri: artwork}}
              style={imageStyle} />
          </View>
          <View style={[contentContainer]}>
            <View style={[textContainer]}>
              <Text style={[titleStyle], {paddingBottom: 3}}>{title}</Text>
              {this.renderApproveText()}
            </View>
            <View style={[buttonContainer]}>
              {this.renderApproveButton()}
              <View>
                <TouchableWithoutFeedback onPress={() => Actions.eventItemDetail()}>
                  {close}
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={() => Actions.eventItemDetail()}>
                  {signIn}
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  skeleton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    // flex: 1,
    width: deviceWidth*0.9,
    height: 200,
    flexDirection: 'column',
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 2,
    shadowColor: 'grey',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  imageContainer: {
    flex: 7,
  },
  contentContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textContainer: {
    flex: 6,
    flexDirection: 'column',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
  },
  buttonContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageStyle: {
    width: null,
    height: 140,
  },
  titleStyle: {
    fontSize: 16,
    fontFamily: 'HelveticaNeue-Medium'
  },
  approvedTextStyle: {
    fontSize: 12,
    fontFamily: 'HelveticaNeue-Medium'
  }
}

export default AdminEventItem;
