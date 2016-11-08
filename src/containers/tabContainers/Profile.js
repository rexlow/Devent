import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';
import firebase from 'firebase';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  PixelRatio,
  Platform
} from 'react-native';
import { Spinner } from './../../components/common';
import ImagePicker from 'react-native-image-picker';
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
      })
      .catch((error) => {
        reject(error)
    })
  })
}

class Profile extends Component {
  constructor(props) {
    super(props)
    if (props.profile.url === null) {
      this.state = {
        uploadURL: null
      }
    } else {
      this.state = {
        uploadURL: props.profile.url
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.url) {
      this.setImage(nextProps.profile.url)
    }
  }

  setImage(url) {
    this.setState({
      uploadURL: url
    });
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

        uploadImage(response.uri)
          .then(url => this.props.uploadImageSuccess(url))
          .catch(error => console.log(error));
      }
    });

  }

  signOut() {
    this.props.logoutUser();
  }

  render() {
    const { centerEverything, skeleton, container, upperContainer, avatarContentContainer, profileItem,
            bottomContainer, content, avatarContainer, avatar, customFont } = styles;
    return(
      <View style={[centerEverything, container]}>
        <View style={[upperContainer]}>
          <View style={[centerEverything, avatarContentContainer]}>
            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={[centerEverything, avatarContainer, avatar]}>
                {
                  (() => {
                    switch (this.state.uploadURL) {
                      case null:
                        return <Text style={{ fontSize: 12 }}>Upload avatar</Text>;
                      case '':
                        return <Spinner size="small"/>
                      default:
                        return (
                          <Image style={avatar} source={{uri: this.state.uploadURL}} />
                        )
                    }
                  })()
                }
              </View>
            </TouchableOpacity>
            <View style={profileItem}>
              <Text style={customFont}>{this.props.userDisplayName}</Text>
              {/* <Text style={customFont}>Name</Text> */}
            </View>
          </View>
        </View>
        <View style={[bottomContainer]}>
          <View style={[centerEverything, content]}>
            <TouchableOpacity onPress={this.signOut.bind(this)}>
              <Text>Sign out</Text>
            </TouchableOpacity>
          </View>
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
    alignItems: 'center',
    marginTop: 110,
  },
  upperContainer: {
    flex: 3,
    flexDirection: 'row',
  },
  bottomContainer: {
    flex: 7,
  },
  content: {
    flex: 1,
  },
  avatarContentContainer: {
    flex: 4,
  },
  profileItem: {
    flexDirection: 'row',
    paddingTop: 10
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
  },
  avatar: {
    borderRadius: 50,
    width: 100,
    height: 100
  },
  customFont: {
    fontSize: 16,
    letterSpacing: 0,
    fontFamily: 'HelveticaNeue-Medium',
    fontWeight: '500',
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    profile: state.profile,
    userDisplayName: state.auth.user.userDisplayName
  }
}

export default connect(mapStateToProps, actions)(Profile);
