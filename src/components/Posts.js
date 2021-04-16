import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import {useLoading} from '../contexts/AppProvider';

import theme from './theme';
import Post from './Post';

import {fetchPostUser} from '../redux/actions/posts';
import PlaceholderHome from './PlaceholderHome';

const Posts = () => {
  const {setIsLoading} = useLoading();
  const posts = useSelector(state => state.posts);

  useEffect(() => {
    if (posts != null) {
      setIsLoading(false);
    }
  }, [posts]);

  return (
    <View style={styles.container}>
      {posts != null ? (
        posts.map((post, i) => <Post key={i} {...post} />)
      ) : (
        <PlaceholderHome />
      )}
    </View>
  );
};

export default Posts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: theme.spacing.m,
  },
});
