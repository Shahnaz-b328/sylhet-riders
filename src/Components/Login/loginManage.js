import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLogin = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
}

export const handleGoogleSignIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider)
    .then(res => {
      const { displayName, email } = res.user;
      const signInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        success: true
      }
      return signInUser;
    })
    .catch(err => {
      console.log(err);
      console.log(err.message);
    })
}
export const handleSignOut = () => {
  return firebase.auth().signOut()
    .then(res => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        error: '',
        success: false
      }
      return signOutUser;
    })
    .catch(err => {

    })
}

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });

}

export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.error = '';
      newUserInfo.success = true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
}

const updateUserName = name => {
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(function () {
    console.log('user name update successfully');
  }).catch(function (error) {
    console.log(error)
  });
}
export const userProfile = (Username) => {
  var user = firebase.auth().currentUser;

  if (user != null) {
    Username = user.displayName;
  }
}