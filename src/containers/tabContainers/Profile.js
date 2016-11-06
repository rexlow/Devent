import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  PixelRatio,
  Platform
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class Profile extends Component {

  state = {
    avatarSource: null,
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
        var source;

        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
          avatarSource: source
        });
      }
    })
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
                { this.state.avatarSource === null
                   ?
                  <Text style={{ fontSize: 12 }}>Upload avatar</Text>
                   :
                  <Image style={avatar} source={this.state.avatarSource} />
                }
              </View>
            </TouchableOpacity>
            <View style={profileItem}>
              <Text style={customFont}>Your </Text>
              <Text style={customFont}>Name</Text>
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

export default connect(null, actions)(Profile);
