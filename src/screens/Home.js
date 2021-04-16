import React, {useEffect} from 'react';
import {
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {useLoading} from '../contexts/AppProvider';

import theme from '../components/theme';
import Header from '../components/Header';
import Posts from '../components/Posts';

import {fetchPosts} from '../redux/actions/posts';

const Home = ({navigation}) => {
  const {setIsLoading} = useLoading();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <Header
        title="Memories"
        icon="chat"
        color={theme.colors.white}
        onPress={() => alert('Message')}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.body}>
          <Posts />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginBottom: theme.spacing.m,
  },
});
