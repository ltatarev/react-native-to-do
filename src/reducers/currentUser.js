import {
  ADD_USER,
  LOG_OUT,
  LOGIN,
  SET_CURRENT_LIST,
} from '../actions/actionTypes';

const currentUserReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [
        {
          currentUser: action.payload.id,
          currentList: null,
        },
      ];
    case LOGIN:
      return [
        {
          currentUser: action.payload.id,
          currentList: null,
        },
      ];
    case LOG_OUT:
      return null;
    case SET_CURRENT_LIST:
      return [
        {
          currentList: action.payload.id,
          currentUser: action.payload.userId,
        },
      ];
    default:
      return state;
  }
};

export default currentUserReducer;
