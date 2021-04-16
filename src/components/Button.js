import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

import theme from './theme';

const Button = ({variant, label, onPress, children}) => {
  const backgroundColor =
    variant == 'primary'
      ? theme.colors.purplePrimary
      : variant == 'outline'
      ? theme.colors.white
      : variant == 'transparent'
      ? 'transparent'
      : theme.colors.greyLight;

  const color = variant == 'primary' ? theme.colors.white : theme.colors.text;
  const border =
    variant == 'outline'
      ? {
          borderWidth: 1,
          borderColor: theme.colors.purplePrimary,
        }
      : null;

  return (
    <View style={[styles.container, {backgroundColor}, border]}>
      <RectButton style={styles.button} onPress={onPress}>
        <Text style={[theme.texts.body, {color}]}>{label}</Text>
      </RectButton>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: theme.radius.s,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: theme.spacing.m,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
