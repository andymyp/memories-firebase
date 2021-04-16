import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';

const Auth = {
  login: async ({email, password}) => {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        showMessage({
          message: 'Kamu telah masuk',
          type: 'success',
          icon: 'success',
        });
      })
      .catch(error => {
        if (error.code == 'auth/user-not-found') {
          showMessage({
            message: 'Email tidak terdaftar',
            type: 'danger',
            icon: 'danger',
          });
        } else {
          showMessage({
            message: 'Password salah',
            type: 'danger',
            icon: 'danger',
          });
        }
      });
  },

  register: async ({nama, email, password}) => {
    return await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .set({
            nama,
            email,
          })
          .then(() => {
            showMessage({
              message: 'Berhasil mendaftar',
              type: 'success',
              icon: 'success',
            });
          });
      })
      .catch(error => {
        if (error.code == 'auth/email-already-in-use') {
          showMessage({
            message: 'Email sudah terdaftar, silahkan gunakan email lain',
            type: 'danger',
            icon: 'danger',
          });
        } else {
          showMessage({
            message: error.code,
            type: 'danger',
            icon: 'danger',
          });
        }
      });
  },

  forgot: async ({email}) => {
    await auth()
      .sendPasswordResetEmail(email)
      .then(result => {
        showMessage({
          message: 'Link reset berhasil dikirim ke email',
          type: 'success',
          icon: 'success',
        });
      })
      .catch(error => {
        if (error.code == 'auth/invalid-email') {
          showMessage({
            message: 'Email salah',
            type: 'danger',
            icon: 'danger',
          });
        } else if (error.code == 'auth/user-not-found') {
          showMessage({
            message: 'Email tidak terdaftar',
            type: 'danger',
            icon: 'danger',
          });
        } else {
          showMessage({
            message: error.code,
            type: 'danger',
            icon: 'danger',
          });
        }
      });
  },

  logout: async () => {
    await auth()
      .signOut()
      .then(() => {
        showMessage({
          message: 'Kamu telah keluar',
          type: 'success',
          icon: 'success',
        });
      });
  },
};

export default Auth;
