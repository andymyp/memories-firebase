import React from 'react';
import {StyleSheet, View, TextInput as RNTextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import theme from './theme';

const TextInput = ({icon, touched, error, inputRef, ...props}) => {
  const color = !touched
    ? theme.colors.grey
    : error
    ? theme.colors.red
    : theme.colors.purplePrimary;

  return (
    <View style={[styles.container, {borderColor: color}]}>
      <View style={[styles.icon, {borderRightColor: color}]}>
        <Icon name={icon} size={20} {...{color}} />
      </View>
      <View style={styles.input}>
        <RNTextInput
          {...props}
          style={theme.texts.input}
          underlineColorAndroid="transparent"
          placeholderTextColor={color}
          ref={input => {
            inputRef && inputRef(input);
          }}
        />
      </View>
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: theme.radius.s,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.m,
  },
  icon: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
  },
  input: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
  },
});
