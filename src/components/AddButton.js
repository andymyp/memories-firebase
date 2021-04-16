import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import ImagePicker from 'react-native-image-crop-picker';

import theme from './theme';

const AddButton = ({state, navigation}) => {
  const icon = () => {
    return <Icon name="add" size={30} color={theme.colors.white} />;
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      cropping: true,
      freeStyleCropEnabled: true,
      cropperStatusBarColor: theme.colors.purplePrimary,
      cropperToolbarColor: theme.colors.purplePrimary,
      cropperToolbarWidgetColor: theme.colors.white,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
    })
      .then(image => {
        navigation.jumpTo('Add', {
          imagePath: image.path,
        });
      })
      .catch(error => {
        return false;
      });
  };

  const onGallery = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      cropping: true,
      freeStyleCropEnabled: true,
      cropperStatusBarColor: theme.colors.purplePrimary,
      cropperToolbarColor: theme.colors.purplePrimary,
      cropperToolbarWidgetColor: theme.colors.white,
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
    })
      .then(image => {
        navigation.jumpTo('Add', {
          imagePath: image.path,
        });
      })
      .catch(error => {
        return false;
      });
  };

  if (state.index == 2) {
    return null;
  } else {
    return (
      <ActionButton
        style={{zIndex: 1}}
        buttonColor={theme.colors.purplePrimary}
        size={70}
        autoInactive={true}
        hideShadow={true}
        offsetX={0}
        offsetY={15}
        renderIcon={icon}
        useNativeFeedback={false}
        position="center">
        <ActionButton.Item
          useNativeFeedback={false}
          buttonColor={theme.colors.greenDark}
          onPress={() => onCamera()}>
          <Icon name="camera-alt" size={25} color={theme.colors.white} />
        </ActionButton.Item>
        <ActionButton.Item
          useNativeFeedback={false}
          buttonColor={theme.colors.blue}
          onPress={() => onGallery()}>
          <Icon name="collections" size={25} color={theme.colors.white} />
        </ActionButton.Item>
      </ActionButton>
    );
  }
};

export default AddButton;
