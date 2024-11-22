import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { setContainer } from './Helper/NavigatorServices';
import NotifService from './Helper/NotifService';
import AppNavigator from './Navigations/AppNavigator';
import InAppUpdate from './Services/InAppUpdate';
import PermissionManager from './Services/PermissionManager';

const App = () => {
  PermissionManager();
  InAppUpdate();

  return (
    <NavigationContainer ref={(navigatorRef) => setContainer(navigatorRef)}>
      <AppNavigator />
      <NotifService />
    </NavigationContainer>
  );
};

export default App;
