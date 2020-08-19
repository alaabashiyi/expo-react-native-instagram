import firebase from "firebase";
import db from "../config/firebase";
import * as Facebook from "expo-facebook";
import { orderBy, groupBy, values } from "lodash";
import { allowNotifications, sendNotification } from "./";

export const updateEmail = (email) => {
  return { type: "UPDATE_EMAIL", payload: email };
};

export const updatePassword = (password) => {
  return { type: "UPDATE_PASSWORD", payload: password };
};

export const updateDisplayName = (displayname) => {
  return { type: "UPDATE_DISPLAYNAME", payload: displayname };
};

export const updateUsername = (username) => {
  return { type: "UPDATE_USERNAME", payload: username };
};

export const updateBio = (bio) => {
  return { type: "UPDATE_BIO", payload: bio };
};

export const updatePhoto = (photo) => {
  return { type: "UPDATE_PHOTO", payload: photo };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const { email, password } = getState().user;
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      dispatch(getUser(response.user.uid));
      dispatch(allowNotifications());
    } catch (e) {
      alert(e);
    }
  };
};

export const facebookLogin = () => {
  console.log("first step");
  return async (dispatch) => {
    try {
      //   await Facebook.initializeAsync("648616929343391");
      const { type, token } = await Facebook.logInWithReadPermissionsAsync(
        "648616929343391"
      );
      console.log("type under here");
      console.log(type);
      if (type === "success") {
        console.log("third step");
        // Build Firebase credential with the Facebook access token.
        const credential = firebase.auth.FacebookAuthProvider.credential(token);
        console.log(token);
        console.log("Forth step");

        // Sign in with credential from the Facebook user.
        const response = await firebase.auth().signInWithCredential(credential);

        console.log("under this should be response");
        console.log(response);
        const user = await db.collection("users").doc(response.uid).get();
        console.log(user);
        if (!user.exists) {
          const user = {
            uid: response.uid,
            email: response.email,
            username: response.displayName,
            displayname: response.displayName,
            bio: "",
            photo: response.photoURL,
            token: null,
          };
          db.collection("users").doc(response.uid).set(user);
          dispatch({ type: "LOGIN", payload: user });
        } else {
          dispatch(getUser(response.uid));
        }
      }
    } catch (e) {
      alert(e);
    }
  };
};

export const getUser = (uid, type) => {
  return async (dispatch, getState) => {
    try {
      const userQuery = await db.collection("users").doc(uid).get();
      let user = userQuery.data();

      let posts = [];
      const postsQuery = await db
        .collection("posts")
        .where("uid", "==", uid)
        .get();
      postsQuery.forEach(function (response) {
        posts.push(response.data());
      });
      user.posts = orderBy(posts, "date", "desc");

      if (type === "LOGIN") {
        dispatch({ type: "LOGIN", payload: user });
      } else {
        dispatch({ type: "GET_PROFILE", payload: user });
      }
    } catch (e) {
      alert(e);
    }
  };
};

export const updateUser = () => {
  return async (dispatch, getState) => {
    const { uid, username, bio, photo } = getState().user;
    try {
      db.collection("users").doc(uid).update({
        username: username,
        bio: bio,
        photo: photo,
      });
    } catch (e) {
      alert(e);
    }
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const { email, displayname, password, username, bio } = getState().user;
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (response.user.uid) {
        const user = {
          uid: response.user.uid,
          email: email,
          username: username,
          displayname: displayname,
          bio: bio,
          photo: "",
          token: null,
          followers: [],
          following: [],
        };
        db.collection("users").doc(response.user.uid).set(user);
        dispatch({ type: "LOGIN", payload: user });
      }
    } catch (e) {
      alert(e);
    }
  };
};



export const googleLogin = () => {
  return async (dispatch) => {
    try {
      signInWithGoogle = (callBack, faillback) => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        this.auth.signInWithPopup(googleProvider).then(callBack).catch(faillback);
      
      
        const response = await firebase.auth().signInWithCredential(credential);
        const user = await db.collection("users").doc(response.uid).get();
        console.log(user);
        if (!user.exists) {
          const user = {
            uid: response.uid,
            email: response.email,
            username: response.displayName,
            displayname: response.displayName,
            bio: "",
            photo: response.photoURL,
            token: null,
          };
          db.collection("users").doc(response.uid).set(user);
          dispatch({ type: "LOGIN", payload: user });
        } else {
          dispatch(getUser(response.uid));
        }
      }
    } catch (e) {
      alert(e);
    }
  };
};












export const followUser = (user) => {
  return async (dispatch, getState) => {
    const { uid, photo, username } = getState().user;
    try {
      db.collection("users")
        .doc(user.uid)
        .update({
          followers: firebase.firestore.FieldValue.arrayUnion(uid),
        });
      db.collection("users")
        .doc(uid)
        .update({
          following: firebase.firestore.FieldValue.arrayUnion(user.uid),
        });
      db.collection("activity").doc().set({
        followerId: uid,
        followerPhoto: photo,
        followerName: username,
        uid: user.uid,
        photo: user.photo,
        username: user.username,
        date: new Date().getTime(),
        type: "FOLLOWER",
      });
      dispatch(sendNotification(user.uid, "Started Following You"));
      dispatch(getUser(user.uid));
    } catch (e) {
      console.error(e);
    }
  };
};

export const unfollowUser = (user) => {
  return async (dispatch, getState) => {
    const { uid, photo, username } = getState().user;
    try {
      db.collection("users")
        .doc(user.uid)
        .update({
          followers: firebase.firestore.FieldValue.arrayRemove(uid),
        });
      db.collection("users")
        .doc(uid)
        .update({
          following: firebase.firestore.FieldValue.arrayRemove(user.uid),
        });
      dispatch(getUser(user.uid));
    } catch (e) {
      console.error(e);
    }
  };
};
