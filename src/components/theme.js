import {moderateScale} from 'react-native-size-matters';

const colors = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',
  purpleRgba: 'rgba(90, 49, 244, 1)',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#FFFFFF',

  red: '#FF0058',
  blue: '#3498db',

  grey: '#A7A7A7',
  greyLight: 'rgba(167, 167, 167, 0.5)',

  yellow: '#E5B42E',

  text: '#272829',
};

const spacing = {
  s: moderateScale(5),
  m: moderateScale(10),
  l: moderateScale(20),
  xl: moderateScale(40),
};

const radius = {
  s: moderateScale(5),
  m: moderateScale(25),
  l: moderateScale(40),
  xl: moderateScale(75),
};

const texts = {
  header: {
    fontFamily: 'Rubik-Bold',
    fontSize: moderateScale(35),
    lineHeight: moderateScale(42.5),
    color: colors.black,
  },
  subheader: {
    fontFamily: 'Rubik-SemiBold',
    fontSize: moderateScale(24),
    lineHeight: moderateScale(30),
    color: colors.black,
  },
  smheader: {
    fontFamily: 'Rubik-Medium',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
    color: colors.text,
  },
  appheader: {
    fontFamily: 'Rubik-Medium',
    fontSize: moderateScale(20),
    lineHeight: moderateScale(30),
    color: colors.text,
  },
  title: {
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
    color: colors.text,
  },
  body: {
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
    color: colors.text,
  },
  input: {
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(16),
    lineHeight: moderateScale(20),
    color: colors.text,
  },
  addpost: {
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(18),
    lineHeight: moderateScale(30),
    color: colors.text,
  },
  error: {
    fontFamily: 'Rubik-Regular',
    textAlign: 'right',
    fontSize: moderateScale(13),
    color: colors.red,
  },
  notif: {
    fontFamily: 'Rubik-Regular',
    fontSize: moderateScale(16),
  },
};

export default {colors, spacing, radius, texts};
