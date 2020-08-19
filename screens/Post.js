import React from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
const GOOGLE_API =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { NavigationEvents } from "react-navigation";
import {
  updateDescription,
  updateLocation,
  uploadPost,
  updatePhoto,
} from "../actions/post";
import { uploadPhoto } from "../actions";
import styles from "../styles";

class Post extends React.Component {
  state = {
    showModal: false,
    locations: [],
  };

  post = () => {
    this.props.uploadPost();
    this.props.navigation.navigate("Home");
  };

  // ifFocus = this.props.navigation.addListener("focus", () => {
  //   if (!this.props.post.photo) {
  //     this.openLibrary();
  //   }
  // });

  // onWillFocus = () => {
  //   console.log("focusing");
  //   if (!this.props.post.photo) {
  //     this.openLibrary();
  //   }
  // };

  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const image = await ImagePicker.launchImageLibraryAsync();
      if (!image.cancelled) {
        const url = await this.props.uploadPhoto(image);
        this.props.updatePhoto(url);
      }
    }
  };

  setLocation = (location) => {
    const place = {
      name: location.name,
      coords: {
        lat: location.geometry.location.lat,
        lng: location.geometry.location.lng,
      },
    };
    this.setState({ showModal: false });
    this.props.updateLocation(place);
  };

  getLocations = async () => {
    this.setState({ showModal: true });
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      const location = await Location.getCurrentPositionAsync();

      const url = `${GOOGLE_API}?location=${location.coords.latitude},${location.coords.longitude}&rankby=distance&key=AIzaSyCbjo9GylinHMkjnFSL9tohRI_bO3iKxxE`;

      const response = await fetch(url);
      const data = await response.json();
      this.setState({ locations: data.results });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onWillFocus={this.onWillFocus} />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.showModal}
        >
          <SafeAreaView style={[styles.container, styles.center]}>
            <FlatList
              keyExtractor={(item) => item.id}
              data={this.state.locations}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.border}
                  onPress={() => this.setLocation(item)}
                >
                  <Text style={styles.gray}>{item.name}</Text>
                  <Text style={styles.gray}>{item.vicinity}</Text>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </Modal>
        <Image
          style={styles.postPhoto}
          source={{ uri: this.props.post.photo }}
        />
        <TextInput
          style={styles.border}
          value={this.props.post.description}
          onChangeText={(text) => this.props.updateDescription(text)}
          placeholder="Description"
        />
        <TouchableOpacity style={styles.border} onPress={this.getLocations}>
          <Text style={styles.gray}>
            {this.props.post.location
              ? this.props.post.location.name
              : "Add a Location"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.post}>
          <Text>Post</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.openLibrary}>
          <Text>Choose a photo</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateDescription, uploadPost, updateLocation, uploadPhoto, updatePhoto },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
