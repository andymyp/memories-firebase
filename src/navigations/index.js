import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import auth from '@react-native-firebase/auth';

import theme from '../components/theme';

import Opening from '../components/Opening';
import Loading from '../components/Loading';

import AuthNavigation from './AuthNavigation';
import AppNavigation from './AppNavigation';

const Navigation = () => {
  const insets = useSafeAreaInsets();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return <Opening />;

  return (
    <NavigationContainer>
      <Loading />
      <FlashMessage
        position="top"
        duration={5000}
        statusBarHeight={insets.top}
        titleStyle={theme.texts.notif}
      />
      {user ? <AppNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;
