import { ADD_TODO, TOGGLE_TODO } from '../actions/actionTypes';

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          completed: false,
          listId: action.payload.listId,
        },
      ];
    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    default:
      return state;
  }
};

export default todoReducer;
