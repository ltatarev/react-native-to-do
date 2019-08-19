import { ADD_USER, LOG_OUT } from '../actions/addUser';
import { SET_CURRENT_LIST } from '../actions/addList';

const currentUserReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
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
          currentUser: action.payload.userId,
          currentList: action.payload.id,
        },
      ];
    default:
      return state;
  }
};

export default currentUserReducer;
