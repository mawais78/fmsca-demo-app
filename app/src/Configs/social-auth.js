import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken, Settings} from 'react-native-fbsdk-next';
import {appleAuth} from '@invertase/react-native-apple-authentication';

GoogleSignin.configure({
  webClientId:
    '387733324683-jdhp92660ejne0pvrn6a8a36fek109h7.apps.googleusercontent.com',
  iosClientId:
    '387733324683-f9qbisggf9np5hltvahf3net8shlgfaf.apps.googleusercontent.com',
  googleServicePlistPath:
    './client_387733324683-f9qbisggf9np5hltvahf3net8shlgfaf.apps.googleusercontent.com.plist',
});

Settings.setAppID('418959403069821');
Settings.initializeSDK();

const handleGoogleAuth = async cb => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    cb(userInfo);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

const handleFacebookAuth = async cb => {
  LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    function (result) {
      if (result.isCancelled) {
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          cb(data);
        });
      }
    },
    function (error) {},
  );
};

const handleAppleAuth = async cb => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      cb(appleAuthRequestResponse);
    }
  } catch (err) {}
};

module.exports = {
  handleGoogleAuth,
  handleFacebookAuth,
  handleAppleAuth,
};
