import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch} from 'react-redux';

import TabBar from '../components/TabBar';
import AddButton from '../components/AddButton';

import Home from '../screens/Home';
import Search from '../screens/Search';
import AddMemories from '../screens/AddMemories';
import Notification from '../screens/Notification';
import Profile from '../screens/Profile';

import {clearDataUser, fetchUser} from '../redux/actions/user';

const AppNavigation = () => {
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearDataUser());
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Tab.Navigator
      tabBar={props => (
        <>
          <TabBar {...props} />
          <AddButton {...props} />
        </>
      )}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Add" component={AddMemories} />
      <Tab.Screen name="Notification" component={Notification} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
