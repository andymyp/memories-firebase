import React, {useEffect, useState} from 'react';
import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';

import {useLoading} from '../contexts/AppProvider';

import theme from './theme';

const {width, height} = Dimensions.get('screen');

const Loading = () => {
  const {isLoading} = useLoading();
  const [load, setLoad] = useState(true);

  useEffect(() => {
    if (isLoading) {
      setLoad(true);
    } else {
      setLoad(false);
    }
  }, [isLoading]);

  if (load) {
    return (
      <View style={styles.container}>
        <View style={styles.backgorund} />
        <LottieView
          style={styles.loading}
          source={require('../assets/json/loading-animation.json')}
          autoPlay
          loop
        />
      </View>
    );
  } else {
    return null;
  }
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 999,
  },
  backgorund: {
    width: 60,
    height: 60,
    position: 'absolute',
    backgroundColor: theme.colors.white,
    borderRadius: 30,
  },
  loading: {
    width: 80,
    height: 80,
  },
});
