import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageModal from 'react-native-image-modal';
import moment from 'moment';
import {useDispatch} from 'react-redux';

import theme from './theme';

import {likePost} from '../redux/actions/posts';

const {width, height} = Dimensions.get('window');

const Post = ({
  memoriesId,
  userId,
  nama,
  caption,
  memories,
  time,
  likes,
  comments,
}) => {
  const idLocale = require('moment/locale/id');
  moment.updateLocale('id', idLocale);

  const dispatch = useDispatch();

  const onLike = docId => {
    dispatch(likePost(docId));
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          style={styles.avatar}
          source={require('../assets/images/avatars/avatar.png')}
        />
        <View>
          <Text style={theme.texts.title}>{nama}</Text>
          <Text style={theme.texts.body}>
            {moment(time.toDate()).fromNow()}
          </Text>
        </View>
      </View>

      <ImageModal
        resizeMode="cover"
        modalImageResizeMode="contain"
        isTranslucent={true}
        swipeToDismiss={false}
        style={{
          width: width - 20,
          height: width / 2,
        }}
        source={{uri: memories}}
      />

      <View style={styles.attributes}>
        <Pressable style={styles.likes} onPress={() => onLike(memoriesId)}>
          <Icon style={styles.icon} name="favorite-outline" size={20} />
          <Text style={theme.texts.body}>{likes}</Text>
        </Pressable>
        <View style={styles.commnets}>
          <Icon style={styles.icon} name="comment" size={20} />
          <Text style={theme.texts.body}>{comments}</Text>
        </View>
      </View>
      <Text style={[theme.texts.body, styles.body]}>{caption}</Text>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: theme.spacing.m,
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.s,
    elevation: 2,
    overflow: 'hidden',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: theme.spacing.m,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.m,
    marginRight: theme.spacing.m,
  },
  attributes: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginRight: theme.spacing.l,
  },
  commnets: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  icon: {
    marginRight: theme.spacing.s,
  },
  body: {
    marginHorizontal: theme.spacing.m,
    marginBottom: theme.spacing.l,
  },
});
