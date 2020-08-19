import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  FlatList,
  Image,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import db from "../config/firebase";
import styles from "../styles";
import { getUser } from "../actions/user";

class Search extends React.Component {
  state = {
    search: "",
    query: [],
  };

  searchUser = async () => {
    let search = [];
    const query = await db
      .collection("users")
      .where("username", ">=", this.state.search)
      .get();
    query.forEach((response) => {
      search.push(response.data());
    });

    search = search.filter((item) => item.uid !== this.props.user.uid);
    console.log(this.props.user, "aioshti");
    this.setState({ search: search });

    this.setState({ query: search });
  };

  goToUser = (user) => {
    this.props.getUser(user.uid, "GET_PROFILE");
    this.props.navigation.navigate("UserProfile");
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={(search) => this.setState({ search })}
          value={this.state.search}
          returnKeyType="send"
          placeholder="Search for friends..."
          onSubmitEditing={this.searchUser}
        />

        <FlatList
          data={this.state.query}
          keyExtractor={(item) => JSON.stringify(item.uid)}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => this.goToUser(item)}
              style={[styles.row, styles.space]}
            >
              <Image style={styles.roundImage} source={{ uri: item.photo }} />
              <View style={[styles.container, styles.left]}>
                <Text style={styles.bold}>{item.username}</Text>
                <Text style={styles.gray}>{item.bio}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getUser }, dispatch);
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
