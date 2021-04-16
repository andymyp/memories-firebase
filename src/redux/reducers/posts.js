export default (state = null, action) => {
  switch (action.type) {
    case 'FETCH_POSTS':
      return action.data;

    case 'LIKE_POST':
      return state.map(post =>
        post.memoriesId === action.data.docId
          ? {...post, likes: action.data._likes}
          : post,
      );

    case 'CLEAR_POSTS':
      return null;

    default:
      return state;
  }
};
