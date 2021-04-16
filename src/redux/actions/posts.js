import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const _userId = auth().currentUser.uid;
const memories = firestore().collection('memories');
const users = firestore().collection('users');
const likes = firestore().collection('likes');

export const fetchPosts = () => async dispatch => {
  try {
    const data = [];
    const userPost = [];

    await memories
      .orderBy('time', 'desc')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          const memoriesId = doc.id;
          const {userId, memories, caption, time, likes, comments} = doc.data();

          data.push({
            memoriesId,
            userId,
            caption,
            memories,
            time,
            likes,
            comments,
          });
        });
      });

    for (let i = 0; i < data.length; i++) {
      const user = await fetchPostUser(data[i].userId);
      userPost.push({
        memoriesId: data[i].memoriesId,
        userId: data[i].userId,
        nama: user.nama,
        caption: data[i].caption,
        memories: data[i].memories,
        time: data[i].time,
        likes: data[i].likes,
        comments: data[i].comments,
      });
    }

    dispatch({type: 'FETCH_POSTS', data: userPost});
  } catch (error) {
    console.log(error.message);
  }
};

const fetchPostUser = async userId => {
  try {
    const {_data} = await users.doc(userId).get();
    return _data;
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = docId => async dispatch => {
  try {
    const {_docs} = await likes
      .where('userId', '==', _userId)
      .where('memoriesId', '==', docId)
      .get();

    const {_data} = await memories.doc(docId).get();
    let _likes = _data.likes;

    if (_docs.length > 0) {
      _likes -= 1;
      await _docs.map(doc => {
        likes.doc(doc.id).delete();
      });
    } else {
      _likes += 1;
      await likes.add({
        memoriesId: docId,
        userId: _userId,
      });
    }

    await memories.doc(docId).update({likes: _likes});

    dispatch({type: 'LIKE_POST', data: {docId, _likes}});
  } catch (error) {
    console.log(error.message);
  }
};

export const clearDataPosts = () => async dispatch => {
  dispatch({type: 'CLEAR_POSTS'});
};
