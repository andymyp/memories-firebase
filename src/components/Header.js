import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from './theme';

const {width} = Dimensions.get('screen');

const Header = ({icon, title, color, onPress}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, {paddingTop: insets.top}]}>
      <View style={styles.container}>
        <Text style={[theme.texts.appheader, {color: color}]}>{title}</Text>
        <Icon name={icon} size={25} color={color} onPress={onPress} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  wrapper: {
    width: width,
    backgroundColor: theme.colors.purplePrimary,
    elevation: 3,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: theme.spacing.m,
  },
});
