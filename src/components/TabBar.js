import React, {useState} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from './theme';

const {width} = Dimensions.get('screen');

const TabBar = ({state, navigation}) => {
  const {routes} = state;
  const [selected, setSelected] = useState('Home');

  const renderColor = currentTab =>
    currentTab == selected ? theme.colors.purplePrimary : theme.colors.grey;

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };

  if (state.index == 2) {
    return null;
  } else {
    return (
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Pressable style={styles.tab} onPress={() => handlePress('Home', 0)}>
            <Icon name="home" size={25} color={renderColor('Home')} />
          </Pressable>
          <Pressable
            style={styles.tab}
            onPress={() => handlePress('Search', 1)}>
            <Icon name="search" size={25} color={renderColor('Search')} />
          </Pressable>
          <View style={[styles.tab, styles.center]}></View>
          <Pressable
            style={styles.tab}
            onPress={() => handlePress('Notification', 3)}>
            <Icon
              name="notifications"
              size={25}
              color={renderColor('Notification')}
            />
          </Pressable>
          <Pressable
            style={styles.tab}
            onPress={() => handlePress('Profile', 4)}>
            <Icon name="person" size={25} color={renderColor('Profile')} />
          </Pressable>
        </View>
      </View>
    );
  }
};

export default TabBar;

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 0,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.m,
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderColor: theme.colors.greyLight,
  },
  tab: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    marginHorizontal: 15,
  },
});
