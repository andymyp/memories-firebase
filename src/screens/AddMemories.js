import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ImagePicker from 'react-native-image-crop-picker';
import ImageModal from 'react-native-image-modal';
import {CommonActions} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {useLoading} from '../contexts/AppProvider';

import theme from '../components/theme';
import Header from '../components/Header';

const {width, height} = Dimensions.get('screen');

const AddMemories = ({route, navigation}) => {
  const {setIsLoading} = useLoading();
  const [caption, setCaption] = useState('');

  const uploadMemories = async () => {
    const imageUri = route.params.imagePath;
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const storageRef = storage().ref(`memories/${filename}`);
    const upload = storageRef.putFile(imageUri);

    try {
      await upload;
      return await storageRef.getDownloadURL();
    } catch (error) {
      return null;
    }
  };

  const submitPost = async () => {
    Keyboard.dismiss();
    setIsLoading(true);

    const imageUrl = await uploadMemories();

    try {
      await firestore()
        .collection('memories')
        .add({
          userId: auth().currentUser.uid,
          memories: imageUrl,
          caption: caption,
          time: firestore.Timestamp.fromDate(new Date()),
          likes: 0,
          comments: 0,
        });

      await ImagePicker.clean();

      setCaption('');
      setIsLoading(false);

      showMessage({
        message: 'Memories berhasil diposting',
        type: 'success',
        icon: 'success',
      });

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
            },
          ],
        }),
      );
    } catch (error) {
      setIsLoading(false);
      showMessage({
        message: error.message,
        type: 'danger',
        icon: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <Header
        title="Memories"
        icon="close"
        color={theme.colors.white}
        onPress={() => navigation.goBack()}
      />

      <ScrollView>
        <View style={styles.body}>
          {route.params.imagePath !== null ? (
            <ImageModal
              resizeMode="cover"
              modalImageResizeMode="contain"
              renderToHardwareTextureAndroid={true}
              isTranslucent={true}
              swipeToDismiss={false}
              style={{
                width: width - 5,
                height: width / 2,
                margin: 2,
              }}
              source={{uri: route.params.imagePath}}
            />
          ) : (
            setIsLoading(true)
          )}

          <TextInput
            style={[styles.textInput, theme.texts.addpost]}
            placeholder="Caption..."
            multiline={true}
            numberOfLines={5}
            onChangeText={text => setCaption(text)}
          />

          <Pressable style={styles.button} onPress={() => submitPost()}>
            <Text style={theme.texts.body}>Post</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddMemories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
  },
  textInput: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  button: {
    width: 100,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderRadius: theme.radius.s,
    borderColor: theme.colors.purplePrimary,
    marginBottom: theme.spacing.xl,
  },
});
