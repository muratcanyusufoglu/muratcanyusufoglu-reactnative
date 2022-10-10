import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './src/Pages/homePage';
import DetailPage from './src/Pages/detailPage';
import AddProductPage from './src/Pages/addProductPage';

const Stack = createNativeStackNavigator();

function Route() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* <Stack.Screen name="Payment" component ={Payment}/> */}
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{title: 'Upayments Store'}}
        />
        <Stack.Screen name="Detail" component={DetailPage} />
        <Stack.Screen name="ProductAdd" component={AddProductPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;
