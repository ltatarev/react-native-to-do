import { ADD_USER, LOG_OUT } from '../actions/actionTypes';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        {
          id: action.payload.id,
          username: action.payload.username,
        },
      ];
    case LOG_OUT:
    default:
      return state;
  }
};

export default usersReducer;
