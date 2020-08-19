import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import {
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getPosts, likePost, unlikePost } from "../actions/post";
import styles from "../styles";
import moment from "moment";

class Home extends React.Component {
  state = { lastPress: null };
  componentDidMount() {
    this.props.getPosts();
  }
  likePost = (post) => {
    let delta = new Date().getTime() - this.state.lastPress;

    if (delta < 200) {
      // double tap happend

      const { uid } = this.props.user;
      if (post.likes.includes(uid)) {
        this.props.unlikePost(post);
      } else {
        this.props.likePost(post);
      }
    }

    this.setState({
      lastPress: new Date().getTime(),
    });
  };

  // likePost = (post) => {
  //   const { uid } = this.props.user;
  //   if (post.likes.includes(uid)) {
  //     this.props.unlikePost(post);
  //   } else {
  //     this.props.likePost(post);
  //   }
  // };

  navigateMap = (item) => {
    this.props.navigation.navigate("Map", { location: item.postLocation });
  };

  render() {
    if (this.props.post === null) return null;
    return (
      <View style={styles.container}>
        <FlatList
          onRefresh={() => this.props.getPosts()}
          refreshing={false}
          data={this.props.post.feed}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <View style={[styles.row, styles.space]}>
                <View style={[styles.row, styles.left]}>
                  <Image
                    style={styles.roundImage}
                    source={{ uri: item.photo }}
                  />
                  <View>
                    <Text>{item.username}</Text>
                    <Text style={[styles.gray, styles.small]}>
                      {moment(item.date).format("ll")}
                    </Text>
                    {item.postLocation ? (
                      <TouchableOpacity onPress={() => this.navigateMap(item)}>
                        <Text>
                          {item.postLocation ? item.postLocation.name : null}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity>
                        <Text></Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <Ionicons style={{ margin: 5 }} name="ios-flag" size={25} />
              </View>
              <TouchableOpacity
                onPress={() => {
                  this.likePost(item);
                }}
                activeOpacity={0.9}
              >
                <Image
                  style={styles.postPhoto}
                  source={{ uri: item.postPhoto }}
                />
              </TouchableOpacity>
              <View style={styles.row}>
                {item.likes.includes(this.props.user.uid) ? (
                  <Ionicons
                    style={{ margin: 5 }}
                    name="ios-heart"
                    size={25}
                    color="red"
                  />
                ) : (
                  <Ionicons
                    style={{ margin: 5 }}
                    name="ios-heart-empty"
                    size={25}
                  />
                )}
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate("Comment", item)
                  }
                >
                  <Ionicons
                    style={{ margin: 5 }}
                    name="ios-chatbubbles"
                    size={25}
                  />
                </TouchableOpacity>
                <Ionicons style={{ margin: 5 }} name="ios-send" size={25} />
              </View>
              <Text>{item.postDescription}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getPosts, likePost, unlikePost }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
