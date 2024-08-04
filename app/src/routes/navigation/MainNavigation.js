import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import Home from '../../Pages/Home';
import Filters from '../../Pages/Filters';

const Stack = createStackNavigator();
const options = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  headerShown: false,
}

export default () => (
  <NavigationContainer 
      theme={{
        colors: {
          background: 'black', 
        },
      }}
  >
     <Stack.Navigator 
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0,
        }
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={Home}/>
      <Stack.Screen
        name="Filters"
        options={options}
        component={Filters}
      />
    </Stack.Navigator>
  </NavigationContainer>
)
