import React from 'react';
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import theme from '../components/theme';
import Button from '../components/Button';
import {useLoading} from '../components/Loading';

const {height} = Dimensions.get('window');

const Welcome = ({navigation}) => {
  // useLoading.show();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <View style={styles.top}>
        <ImageBackground
          resizeMode="stretch"
          source={require('../assets/images/backgrounds/memories_bg.jpg')}
          style={styles.headerContainer}>
          <Animatable.Text
            animation="bounceIn"
            duration={2000}
            delay={300}
            style={[theme.texts.header, styles.header]}>
            Memories
          </Animatable.Text>
        </ImageBackground>
      </View>

      <View style={styles.body}>
        <Text style={[styles.subheader, theme.texts.subheader]}>Ayo mulai</Text>
        <Text style={[styles.textbody, theme.texts.title]}>
          Masuk atau daftar untuk menyimpan dan membagikan memories kamu
        </Text>
        <Button
          label="Punya akun? Masuk"
          variant="primary"
          onPress={() => navigation.navigate('Login')}
        />
        <Button
          label="Daftar sekarang, gratis!"
          variant="outline"
          onPress={() => navigation.navigate('Register')}
        />
        <Button
          label="Lupa password?"
          variant="transparent"
          onPress={() => navigation.navigate('ForgotPassword')}
        />
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.purplePrimary,
  },
  top: {
    height: height * 0.4 + theme.radius.l,
    overflow: 'hidden',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    top: height * 0.4 - theme.radius.l - 10,
    color: theme.colors.white,
    textShadowColor: theme.colors.black,
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  body: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    top: height * 0.4,
    borderTopLeftRadius: theme.radius.l,
    borderTopRightRadius: theme.radius.l,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  subheader: {
    marginBottom: 20,
  },
  textbody: {
    textAlign: 'center',
    marginBottom: 30,
  },
});
