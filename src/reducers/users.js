import { ADD_USER } from '../actions/addUser';

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
    default:
      return state;
  }
};

export default usersReducer;
