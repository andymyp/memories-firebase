import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import ImageModal from 'react-native-image-modal';

import {useLoading} from '../contexts/AppProvider';

import theme from '../components/theme';
import Header from '../components/Header';
import Post from '../components/Post';
import PlaceholderHome from '../components/PlaceholderHome';

import Auth from '../services/Auth';
import {fetchUserPosts, clearData} from '../redux/actions/user';

const {width} = Dimensions.get('screen');

const Profile = () => {
  const {setIsLoading} = useLoading();
  const dispatch = useDispatch();
  const data = useSelector(state => state.user);

  let likes = 0;
  let comments = 0;

  if (data.userPosts != null) {
    for (let i = 0; i < data.userPosts.length; i++) {
      likes += data.userPosts[i].likes;
      comments += data.userPosts[i].comments;
    }
  }

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchUserPosts());

    if (data.userPosts != null) {
      setIsLoading(false);
    }
  }, [dispatch, data]);

  if (data.profile != null) {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor="transparent"
        />

        <Header
          title="Memories"
          icon="logout"
          color={theme.colors.white}
          onPress={() => Auth.logout()}
        />

        <ScrollView>
          <View style={styles.avatar}>
            <ImageModal
              resizeMode="cover"
              modalImageResizeMode="contain"
              isTranslucent={true}
              swipeToDismiss={false}
              style={{
                width: 100,
                height: 100,
                borderRadius: theme.radius.xl,
              }}
              source={require('../assets/images/avatars/avatar.png')}
            />
          </View>

          <Text style={[styles.name, theme.texts.smheader]}>
            {data.profile.nama}
          </Text>
          <Text style={[styles.email, theme.texts.body]}>
            {data.profile.email}
          </Text>

          <View style={styles.total}>
            <View style={styles.boxTotal}>
              <Icon
                name="favorite"
                size={20}
                color={theme.colors.purplePrimary}
              />
              <Text style={[styles.text, theme.texts.body]}>{likes}</Text>
            </View>
            <View style={styles.boxTotal}>
              <Icon
                name="comment"
                size={20}
                color={theme.colors.purplePrimary}
              />
              <Text style={[styles.text, theme.texts.body]}>{comments}</Text>
            </View>
            <View style={styles.boxTotal}>
              <Icon name="edit" size={20} color={theme.colors.purplePrimary} />
              <Text style={[styles.text, theme.texts.body]}>Edit</Text>
            </View>
          </View>

          <View style={styles.posts}>
            {data.userPosts != null ? (
              data.userPosts.map((post, i) => (
                <Post key={i} nama={data.profile.nama} {...post} />
              ))
            ) : (
              <PlaceholderHome />
            )}
          </View>
        </ScrollView>
      </View>
    );
  } else {
    return null;
  }
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginTop: theme.spacing.l,
    borderRadius: theme.radius.xl,
    overflow: 'hidden',
  },
  name: {
    textAlign: 'center',
    marginTop: 20,
  },
  email: {
    textAlign: 'center',
  },
  total: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.l,
  },
  boxTotal: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.colors.purplePrimary,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 100,
    height: 40,
    paddingHorizontal: theme.spacing.l,
    marginHorizontal: theme.spacing.s,
    borderRadius: theme.radius.s,
  },
  posts: {
    marginTop: 30,
    padding: theme.spacing.m,
  },
});
