import React from 'react';
import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

import theme from './theme';

const {width, height} = Dimensions.get('window');

const Opening = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <LottieView
        source={require('../assets/json/opening-animation.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default Opening;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    backgroundColor: theme.colors.purplePrimary,
  },
});
