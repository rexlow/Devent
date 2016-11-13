'use strict';
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  PixelRatio
} from 'react-native';
import { Input, Spinner } from './../../../components/common';
import ButtonComponent from 'react-native-button-component';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../../actions';
import firebase from 'firebase';

import ImagePicker from 'react-native-image-picker';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class AddEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      date: '',
      time: '',
      cost: '',
      note: '',
      organizer: '',
      address: '',
      buttonState: 'submitEvent'
    };

    this.buttonStates = {
      submitEvent: {
        text: 'SUBMIT EVENT',
        onPress: () => {
          this.setState({ buttonState: 'loading' });
        },
      },
      loading: {
        spinner: true,
        text: 'SUBMITTING YOUR EVENT'
      }
    };
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true //disable icloud backup
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({ uploadURL: '' })

        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }
        this.props.storeAvatar(source);

        uploadImage(response.uri)
          .then(url => this.props.uploadImageSuccess(url))
          .catch(error => console.log(error));
      }
    });
  }

  render() {
    const { centerEverything, skeleton, container, textContainer, contentContainer, buttonContainer,
      propHeight, propWidth, halfPropWidth, titleContainer, descContainer, title, artworkTitle, editTitle,
      desc, buttonStyle, artworkContainer, artwork } = styles;
    return (
      <View style={[centerEverything, container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={titleContainer}>
            <Text style={[title]}>Add Event</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>Submit your event and we will process it in a bit ⚡️</Text>
          </View>
        </View>
        <View style={[contentContainer, propWidth]}>
          <View style={[centerEverything, artworkContainer]}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={[centerEverything, artwork]}>
                <Text style={[artworkTitle]}>Upload event artwork</Text>
                <Text style={[desc]}>Preferably 640x480</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Input
            propWidth={propWidth}
            placeholder="Event Title"
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title} />
          <View style={{ flexDirection: 'row' }}>
            <Input
              propWidth={halfPropWidth}
              placeholder="Date"
              onChangeText={(date) => this.setState({ date })}
              value={this.state.date} />
            <Input
              propWidth={halfPropWidth}
              placeholder="Time"
              onChangeText={(time) => this.setState({ time })}
              value={this.state.time} />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Input
              propWidth={halfPropWidth}
              placeholder="Organizer"
              onChangeText={(organizer) => this.setState({ organizer })}
              value={this.state.organizer} />
            <Input
              propWidth={halfPropWidth}
              placeholder="Cost"
              onChangeText={(cost) => this.setState({ cost })}
              value={this.state.cost} />
          </View>
          <Input
            propWidth={propWidth}
            placeholder="Address"
            onChangeText={(address) => this.setState({ address })}
            value={this.state.address} />
          <Input
            propWidth={[propHeight, propWidth]}
            placeholder="Note"
            multiline={true}
            onChangeText={(note) => this.setState({ note })}
            value={this.state.note} />
        </View>
        <View style={[buttonContainer]}>
          <ButtonComponent
            style={buttonStyle}
            type='primary'
            shape='rectangle'
            buttonState={this.state.buttonState}
            states={this.buttonStates}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  skeleton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5F6F7',
    marginTop: 44
  },
  textContainer: {
    flex: 2,
    marginTop: 20
  },
  propHeight: {
    height: 80
  },
  propWidth: {
    width: deviceWidth*0.8
  },
  halfPropWidth: {
    width: deviceWidth*0.4
  },
  contentContainer: {
    flex: 8,
    width: deviceWidth
  },
  buttonContainer: {
    width: deviceWidth,
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 20
  },
  titleContainer: {
    width: deviceWidth*0.8,
  },
  descContainer: {
    width: deviceWidth*0.6,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    textAlign: 'center'
  },
  artworkTitle: {
    fontSize: 18
  },
  editTitle: {
    fontSize: 18,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'left',
    paddinBottom: 10
  },
  desc: {
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'center'
  },
  buttonStyle: {
    height: 40,
    width: deviceWidth*0.7,
    borderRadius: 20,
    margin: 3
  },
  artworkContainer: {
    borderColor: '#9B9B9B',
    borderRadius: 3,
    borderWidth: 1 / PixelRatio.get(),
    marginBottom: 5
  },
  artwork: {
    width: null,
    height: 100
  },
}

export default connect(null, actions)(AddEvent);
