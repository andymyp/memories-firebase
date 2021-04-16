const initialState = {
  profile: null,
  userPosts: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      return {
        ...state,
        profile: action.data,
      };

    case 'FETCH_USER_POSTS':
      return {
        ...state,
        userPosts: action.data,
      };

    case 'CLEAR_USER':
      return initialState;

    default:
      return state;
  }
};
