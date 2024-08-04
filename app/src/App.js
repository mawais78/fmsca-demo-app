import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/store';
import { NoInternetToast } from './Components/NoInternet';
import Router from './routes';
import { PersistGate } from "redux-persist/integration/react";
import SplashScreen from 'react-native-splash-screen'

const App = () => {
  useEffect(() => {
    // LogBox.ignoreLogs(['Warning: ...']);
    console.disableYellowBox = true; 
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000)
  }, []);

  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router />
          <NoInternetToast />
        </PersistGate>
      </Provider>
  );
};

export default App;
