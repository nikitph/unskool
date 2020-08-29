import { LoginManager, AccessToken } from "react-native-fbsdk";
import firebase from "firebase";
import { GoogleSignin } from "@react-native-community/google-signin";

export const fbLogin = () => {
  return LoginManager.logInWithPermissions(["public_profile"]).then(
    result => {
      if (result.isCancelled) {
        alert("Login was cancelled");
        return null;
      } else {
        return AccessToken.getCurrentAccessToken().then(data => {
          const provider = firebase.auth.FacebookAuthProvider;
          const credential = provider.credential(data.accessToken);
          return credential;
        });
      }
    },
    error => {
      alert("Login failed with error: " + error);
      return null;
    }
  );
  //});
};

export const googleLogin = async () => {
  await GoogleSignin.hasPlayServices();
  const userInfo = await GoogleSignin.signIn();
  const provider = firebase.auth.GoogleAuthProvider;
  const credential = provider.credential(userInfo.idToken);
  return credential;
};
