import React from 'react';
import {
  Dimensions,
  Image,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {useLoading} from '../contexts/AppProvider';

import theme from '../components/theme';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

import Auth from '../services/Auth';

const {width} = Dimensions.get('window');

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Format email salah')
    .required('Tidak boleh kosong'),
  password: Yup.string()
    .min(6, 'Password terlalu pendek')
    .max(20, 'Password terlalu panjang')
    .required('Tidak boleh kosong'),
});

const Login = ({navigation}) => {
  const {setIsLoading} = useLoading();

  const onLogin = values => {
    Keyboard.dismiss();
    setIsLoading(true);

    Auth.login(values).then(() => setIsLoading(false));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration={2000}
          delay={600}
          style={styles.logo}
          source={require('../assets/images/memories.png')}
        />
      </View>

      <Animatable.View animation="fadeInUpBig" style={styles.body}>
        <Text style={[styles.textHeader, theme.texts.subheader]}>
          Selamat datang
        </Text>
        <Text style={[styles.textBody, theme.texts.body]}>
          Masukan email dan password untuk masuk ke akunmu
        </Text>

        <Formik
          validationSchema={LoginSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={values => onLogin(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              {errors.email && touched.email ? (
                <Text style={theme.texts.error}>{errors.email}</Text>
              ) : null}
              <TextInput
                icon="email"
                placeholder="Email"
                autoCompleteType="email"
                autoCapitalize="none"
                returnKeyType="next"
                returnKeyLabel="Next"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                touched={touched.email}
                error={errors.email}
                value={values.email}
                blurOnSubmit={false}
                onSubmitEditing={() => this.next.focus()}
              />

              {errors.password && touched.password ? (
                <Text style={theme.texts.error}>{errors.password}</Text>
              ) : null}
              <TextInput
                icon="lock"
                placeholder="Password"
                autoCompleteType="password"
                returnKeyType="go"
                returnKeyLabel="Go"
                secureTextEntry={true}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                touched={touched.password}
                error={errors.password}
                inputRef={input => {
                  this.next = input;
                }}
                blurOnSubmit={true}
                onSubmitEditing={() => handleSubmit()}
              />

              <View style={styles.button}>
                <Button
                  label="Masuk"
                  variant="primary"
                  onPress={() => handleSubmit()}
                />
                <Button
                  label="Lupa password?"
                  variant="transparent"
                  onPress={() => navigation.navigate('ForgotPassword')}
                />
              </View>
            </View>
          )}
        </Formik>

        <View style={styles.line}>
          <Text style={styles.lineText}>Atau</Text>
        </View>

        <Button
          label="Daftar sekarang, gratis!"
          variant="outline"
          onPress={() => navigation.navigate('Register')}
        />
      </Animatable.View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.purplePrimary,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  body: {
    flex: 3,
    width: width,
    padding: theme.spacing.l,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.radius.l,
    borderTopRightRadius: theme.radius.l,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    marginBottom: 10,
  },
  textBody: {
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing.l,
    marginBottom: theme.spacing.xl,
  },
  line: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: theme.colors.grey,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  lineText: {
    width: 50,
    position: 'absolute',
    top: -theme.spacing.m,
    textAlign: 'center',
    backgroundColor: theme.colors.white,
  },
});
