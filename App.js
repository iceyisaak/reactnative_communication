import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: null,
      location: null
    };

  }




  // recordAudio = async () => {

  //   const soundObject = new Audio.Sound();
  //   try {
  //     await soundObject.loadAsync(require('./assets/sounds/hello3.mp3'));
  //     await soundObject.playAsync();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // recordVideo = async () => {

  //   const videoObject = new Audio.Recording();

  //   try {
  //     await recording.prepareToRecordAync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
  //     await recording.startAsync();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };


  // Inputing Images to App

  // pickImage = async () => {

  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  //   if (status === 'granted') {

  //     let result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: 'Images'
  //     }).catch(
  //       error => console.log(error)
  //     );

  //     if (!result.cancelled) {
  //       this.setState({
  //         image: result
  //       });
  //     }

  //   }

  // };


  // takePhoto = async () => {

  //   const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

  //   if (status === 'granted') {
  //     let result = await ImagePicker.launchCameraAsync({
  //       mediaTypes: 'Images'
  //     }).catch(
  //       error => console.log(error)
  //     );

  //     if (!result.cancelled) {
  //       this.setState({
  //         image: result
  //       });
  //     }
  //   }
  // };


  getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({}).catch(error => console.log(error));

      if (result) {
        this.setState({
          location: result
        });
      }
    }
  };


  render() {


    return (
      <View style={styles.container} >

        <View style={styles.buttonsPanel}>

          <TouchableOpacity
            onPress={this.getLocation}
            style={styles.button}
          >
            <Text>
              Get Location
            </Text>

          </TouchableOpacity>
          {/* <Text>
            Inputing Images to App
          </Text>
          <TouchableOpacity
            onPress={this.pickImage}
            style={styles.button}
          >
            <Text>
              Pick an Image from Library
            </Text>

          </TouchableOpacity>
          <TouchableOpacity
            title='Take a Photo'
            onPress={this.takePhoto}
            style={styles.button}
          >
            <Text>
              Take a Photo
            </Text>

          </TouchableOpacity> */}
        </View>

        {
          this.state.image &&
          <Image
            source={{
              uri: this.state.image.uri
            }}

            style={
              styles.Image
            }
          />
        }

        {
          this.state.location &&
          <MapView
            style={styles.Map}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}
          />
        }

      </View >
    );
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsPanel: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'space-between'
  },
  button: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#6fb',
    alignItems: 'center'
  },
  Image: {
    width: 200,
    height: 200
  },
  Map: {
    width: 300,
    height: 300
  }
});
