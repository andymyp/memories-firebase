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
import Loading from '../components/Loading';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

import Auth from '../services/Auth';

const {width, height} = Dimensions.get('window');

const RegisterSchema = Yup.object().shape({
  nama: Yup.string()
    .min(2, 'Nama terlalu pendek')
    .max(50, 'Nama terlalu panjang')
    .required('Tidak boleh kosong'),
  email: Yup.string()
    .email('Format email salah')
    .required('Tidak boleh kosong'),
  password: Yup.string()
    .min(6, 'Password terlalu pendek')
    .max(20, 'Password terlalu panjang')
    .required('Tidak boleh kosong'),
  repassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Password tidak cocok')
    .required('Tidak boleh kosong'),
});

const Register = ({navigation}) => {
  const {setIsLoading} = useLoading();
  const onRegister = values => {
    Keyboard.dismiss();
    setIsLoading(true);

    Auth.register(values).then(() => setIsLoading(false));
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
          Buat akun baru
        </Text>
        <Text style={[styles.textBody, theme.texts.body]}>
          Masukan email dan password untuk masuk ke akunmu
        </Text>

        <Formik
          validationSchema={RegisterSchema}
          initialValues={{nama: '', email: '', password: '', repassword: ''}}
          onSubmit={values => onRegister(values)}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              {errors.nama && touched.nama ? (
                <Text style={theme.texts.error}>{errors.nama}</Text>
              ) : null}
              <TextInput
                icon="person"
                placeholder="Nama lengkap"
                autoCompleteType="name"
                autoCapitalize="none"
                returnKeyType="next"
                returnKeyLabel="Next"
                onChangeText={handleChange('nama')}
                onBlur={handleBlur('nama')}
                touched={touched.nama}
                error={errors.nama}
                value={values.nama}
                blurOnSubmit={false}
                onSubmitEditing={() => this.next1.focus()}
              />

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
                inputRef={input => {
                  this.next1 = input;
                }}
                onSubmitEditing={() => this.next2.focus()}
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
                blurOnSubmit={false}
                inputRef={input => {
                  this.next2 = input;
                }}
                onSubmitEditing={() => this.next3.focus()}
              />

              {errors.repassword && touched.repassword ? (
                <Text style={theme.texts.error}>{errors.repassword}</Text>
              ) : null}
              <TextInput
                icon="lock-clock"
                placeholder="Ulangi password"
                autoCompleteType="password"
                returnKeyType="go"
                returnKeyLabel="Go"
                secureTextEntry={true}
                onChangeText={handleChange('repassword')}
                onBlur={handleBlur('repassword')}
                touched={touched.repassword}
                error={errors.repassword}
                inputRef={input => {
                  this.next3 = input;
                }}
                blurOnSubmit={true}
                onSubmitEditing={() => handleSubmit()}
              />

              <View style={styles.button}>
                <Button
                  label="Daftar sekarang"
                  variant="primary"
                  onPress={() => handleSubmit()}
                />
                <Button
                  label="Punya akun? Masuk"
                  variant="transparent"
                  onPress={() => navigation.navigate('Login')}
                />
              </View>
            </View>
          )}
        </Formik>
      </Animatable.View>
    </View>
  );
};

export default Register;

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
