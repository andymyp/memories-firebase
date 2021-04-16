import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const users = firestore().collection('users');
const memories = firestore().collection('memories');

export const fetchUser = () => async dispatch => {
  try {
    const {_data} = await users.doc(auth().currentUser.uid).get();
    dispatch({type: 'FETCH_USER', data: _data});
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchUserPosts = () => async dispatch => {
  try {
    const data = [];

    await memories.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const memoriesId = doc.id;
        const {userId, caption, time, memories, likes, comments} = doc.data();

        if (userId == auth().currentUser.uid) {
          data.push({
            memoriesId,
            userId,
            caption,
            memories,
            time,
            likes,
            comments,
          });
        }
      });
    });

    dispatch({type: 'FETCH_USER_POSTS', data: data});
  } catch (error) {
    console.log(error.message);
  }
};

export const clearDataUser = () => async dispatch => {
  dispatch({type: 'CLEAR_USER'});
};
