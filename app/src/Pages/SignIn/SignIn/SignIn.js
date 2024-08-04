import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { connect, useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../../Components/ErrorMessage';

const SignIn = props => {
  const { navigation } = props;
  const dispatch = useDispatch();
  // const { loading } = useSelector(state => state.auth);
  const [email, setEmail] = useState(props.route.params?.email || '');
  const [errors, setErrors] = useState(null);

  const handleNext = async () => {
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailReg.test(email)) {
      setErrors(t('invalidEmail'));
      setTimeout(() => setErrors(null), 3000);
      return;
    }

    try {
      dispatch(isLoading(true));
      const { data } = await emailCheck({ email });
      dispatch(isLoading(false));
      if (data.isExist && data.userType === 2) {
        dispatch(emailCheckAction(email));
        navigation.navigate('SignInPassword');
      } else {
        Alert.alert(t('notExist'));
        navigation.navigate('SignUp', {
          email,
        });
      }
    } catch (error) {
      alert(error);
      dispatch(isLoading(false));
      setErrors(error.message);
      error?.response && setErrors(error?.response?.data.message);
      setTimeout(() => setErrors(null), 3000);
    }
  };

  const getUserData = async (user) => {
    try {
      const { data } = await getMe(user.token);
      dispatch(storeLoggedUser(data));
      getChatTemplate();
      getQuestionnaires();
      dispatch(loginUser());
      dispatch(isLoading(false));
    } catch (error) {
      setErrors(error.message);
      error?.response && setErrors(error?.response?.data.message);
      setTimeout(() => setErrors(null), 3000);
      dispatch(isLoading(false));
    }
  };

  return (
    <ScrollView
      style={styles.rootContainer}
      contentContainerStyle={{ flexGrow: 1 }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      {errors && <ErrorMessage message={errors} />}
      <ImageBackground
        style={styles.bgImageContainer}
        source={require('../../../Assets/Images/SignIn_bg.png')}>
        <Text style={styles.welcomeText}></Text>
        <Text style={styles.welcomeSubText}>

        </Text>
      </ImageBackground>
      <View style={styles.alignCenter}>
        <View style={styles.signInContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>sss</Text>
            <TextInput
              style={errors ? styles.errorinput : styles.input}
              placeholderTextColor="#69707A"
              onChangeText={setEmail}
              value={email}
              placeholder={"ssssss"}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity disabled={!email } onPress={handleNext}>
            <Text
              style={[
                styles.continueBtn,
                {
                  backgroundColor: email ? '#009B4C' : '#80CDA5',
                },
              ]}>
              continue
            </Text>
          </TouchableOpacity>
          <View style={styles.centerMe}>
            <View style={styles.horizontalLine}></View>
            <Text style={styles.orTxt}>ss</Text>
          </View>
          <View style={[styles.rowCenter, { marginBottom: 50 }]}>
            <Text style={styles.dontAccountTxt}>dont have </Text>
            <Pressable
              onPress={() => navigation.navigate('SignUp')}
              hitSlop={{bottom: 20, left: 20, right: 20, top: 20}}>
              <Text style={styles.signUpBtn}>signup</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => {
  return {
    // login: state.auth.message
  };
};

export default connect(mapStateToProps, {

})(SignIn);

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  welcomeText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 32,
  },
  bgImageContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: 76,
    marginBottom: 24,
    borderBottomEndRadius: 16,
    borderBottomStartRadius: 16,
    overflow: 'hidden',
  },
  welcomeSubText: {
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 12,
    fontSize: 16,
    lineHeight: 22,
  },
  signInContainer: {
    marginHorizontal: 20,
  },
  alignCenter: {
    // alignItems: 'center'
  },
  centerMe: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 16,
  },
  horizontalLine: {
    width: '100%',
    borderBottomColor: '#D9DBDF',
    borderBottomWidth: 1,
  },
  orTxt: {
    fontSize: 16,
    color: '#69707A',
    marginTop: -12,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  inputContainer: {
    marginVertical: 12,
  },
  inputLabel: {
    color: '#69707A',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    color: '#69707A',
    borderWidth: 1,
    borderColor: '#D9DBDF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f9f9fa',
    height: 50,
  },
  errorinput: {
    fontSize: 16,
    color: '#69707A',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f9f9fa',
  },
  continueBtn: {
    backgroundColor: '#009B4C',
    paddingVertical: 16,
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    borderRadius: 12,
    textAlign: 'center',
    marginVertical: 12,
    overflow: 'hidden',
  },
  socialSignUpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#D9DBDF',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 24,
    height: 50,
    alignItems: 'center',
    marginVertical: 8,
  },
  appleIcon: {
    height: 16,
    width: 13,
    marginLeft: 1,
  },
  googleIcon: {
    width: 15.68,
    height: 16,
  },
  facebookIcon: {
    width: 8.4,
    height: 16,
    marginLeft: 4,
  },
  socialBtnTxt: {
    color: '#031C37',
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  dontAccountTxt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#031C37',
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '30%',
  },
  signUpBtn: {
    fontSize: 14,
    fontWeight: '700',
    color: '#009B4C',
    marginLeft: 6,
  },
});
