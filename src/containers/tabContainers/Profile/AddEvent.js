'use strict';
import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
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
const dismissKeyboard = require('dismissKeyboard')

import RNFetchBlob from 'react-native-fetch-blob';

// Prepare Blob support
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

const uploadImage = (uri, mime = 'application/octet-stream') => {
  const storage = firebase.storage(); //declare storage here just for this instance
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child(`${sessionId}`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
        reject((error) => console.log(error))
      })
      .catch((error) => {
        reject(error)
    })
  })
}

class AddEvent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      title: '',
      date: '',
      time: '',
      cost: '',
      note: '',
      organizer: '',
      address: '',
      artworkUrl: null,
      artworkToUpload: '',
      buttonState: 'submitEvent'
    };

    this.buttonStates = {
      submitEvent: {
        text: 'SUBMIT EVENT',
        onPress: () => {
          this.submitEventHelper()
        },
      },
      loading: {
        spinner: true,
        text: 'SUBMITTING YOUR EVENT'
      }
    };
  }

  componentWillMount() {
    this.props.resetEventArtwork()
    this.props.resetMessage()
  }

  componentWillReceiveProps(nextProps) {
    this.propsMessage(nextProps)
  }

  propsMessage(props) {
    console.log(props);
    if (props.profile.eventArtwork) {
      this.setImage(props.profile.eventArtwork)
    }

    if (props.profile.message) {
      Alert.alert('Message', props.profile.message.message, [
        {text: 'Ok', onPress: () => Actions.pop()}
      ])
      this.props.resetMessage()
    }
    this.setState({ buttonState: 'submitEvent' });
  }

  setImage(url) {
    this.setState({
      artworkUrl: url
    });
  }

  submitEventHelper() {
    const { title, date, time, organizer, cost, address, note, artworkToUpload } = this.state;
    if (title           !== '' &&
        date            !== '' &&
        time            !== '' &&
        organizer       !== '' &&
        cost            !== '' &&
        address         !== '' &&
        note            !== '' ) {
      this.setState({ buttonState: 'loading' });
      this.props.submitEvent(title, date, time, organizer, cost, address, note, artworkToUpload);
    } else {
      Alert.alert('Error', 'Please make sure you have all the fields filled in.')
    }
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
        this.setState({ artworkUrl: '' })

        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        if (Platform.OS === 'ios') {
          const source = {uri: response.uri.replace('file://', ''), isStatic: true};
        } else {
          const source = {uri: response.uri, isStatic: true};
        }

        // this.setState({ artworkUrl: source.uri }) //a temporary fix

        // this.setState({ artworkUrl: '' });
        uploadImage(response.uri)
          .then(url => {
            this.setState({ artworkToUpload: url })
            this.props.storeArtwork(source);
          })
          .catch(error => {
            Alert.alert('Image uploading failed', 'Please check your internet connection')
            this.setState({ artworkUrl: null })
          });
      }
    });
  }

  render() {
    const { centerEverything, skeleton, container, textContainer, contentContainer, buttonContainer,
      propHeight, propWidth, halfPropWidth, titleContainer, descContainer, title, artworkTitle,
      desc, buttonStyle, artworkContainer, artwork } = styles;
    return (
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <View style={[centerEverything, container]}>
          <View style={[centerEverything, textContainer]}>
            <View style={titleContainer}>
              <Text style={[title]}>Add Event</Text>
            </View>
            <View style={descContainer}>
              <Text style={[desc]}>Submit your event and we will process it in a bit ⚡️</Text>
            </View>
          </View>
          <ScrollView style={[contentContainer, propWidth]}>
            <View style={[centerEverything, artworkContainer]}>
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                <View style={[centerEverything, {height: 100, width: deviceWidth*0.8}]}>
                  {
                    (() => {
                      switch (this.state.artworkUrl) {
                        case null:
                          return (
                            <View>
                              <Text style={[artworkTitle]}>Upload event artwork</Text>
                              <Text style={[desc]}>Preferably 640x480</Text>
                            </View>
                          );
                        case '':
                          return <Spinner size="small"/>
                        default:
                          return(
                            <Image style={artwork} source={{uri: this.state.artworkUrl}} />
                          )
                      }
                    })()
                  }

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
              propWidth={[propHeight, propWidth]}
              placeholder="Address"
              multiline={true}
              onChangeText={(address) => this.setState({ address })}
              value={this.state.address} />
            <Input
              propWidth={[propHeight, propWidth]}
              placeholder="Note"
              multiline={true}
              onChangeText={(note) => this.setState({ note })}
              value={this.state.note} />
          </ScrollView>
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
      </TouchableWithoutFeedback>
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
    marginBottom: 5,
    width: deviceWidth*0.8,
    height: 100
  },
  artwork: {
    width: deviceWidth*0.8,
    height: 100
  },
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  }
}

export default connect(mapStateToProps, actions)(AddEvent);
