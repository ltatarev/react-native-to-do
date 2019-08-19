import { ADD_USER, LOG_OUT } from '../actions/addUser';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_USER:
      return [
        ...state,
        {
          id: action.payload.id,
          username: action.payload.content,
        },
      ];
    case LOG_OUT:
      return state;
    default:
      return state;
  }
};

export default usersReducer;
