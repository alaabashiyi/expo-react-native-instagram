import React from "react";
import styles from "../styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Text, View, TextInput, TouchableOpacity, Image } from "react-native";
import {
  updatePhoto,
  updateEmail,
  updatePassword,
  updateUsername,
  updateDisplayName,
  updateBio,
  signup,
} from "../actions/user";
import { uploadPhoto } from "../actions";

class Signup extends React.Component {
  onPress = () => {
    this.props.signup();
    this.props.navigation.navigate("Home");
  };

  openLibrary = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!image.cancelled) {
        const url = await this.props.uploadPhoto(image);
        this.props.updatePhoto(url);
      }
    }
  };

  render() {
    return (
      <View style={[styles.container, styles.center]}>
        <TouchableOpacity style={styles.center} onPress={this.openLibrary}>
          <Image
            style={styles.roundImage}
            source={{ uri: this.props.user.photo }}
          />
          <Text style={styles.bold}>Upload Photo</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.border}
          editable={true}
          value={this.props.user.email}
          onChangeText={(input) => this.props.updateEmail(input)}
          placeholder="Email"
        />
        <TextInput
          style={styles.border}
          editable={true}
          value={this.props.user.password}
          onChangeText={(input) => this.props.updatePassword(input)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.border}
          value={this.props.user.displayname}
          onChangeText={(input) => this.props.updateDisplayName(input)}
          placeholder="Display Name"
        />
        <TextInput
          style={styles.border}
          value={this.props.user.username}
          onChangeText={(input) => this.props.updateUsername(input)}
          placeholder="Username"
        />
        <TextInput
          style={styles.border}
          value={this.props.user.bio}
          onChangeText={(input) => this.props.updateBio(input)}
          placeholder="Bio"
        />
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      updatePhoto,
      uploadPhoto,
      updateEmail,
      updatePassword,
      updateUsername,
      updateDisplayName,
      updateBio,
      signup,
    },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
