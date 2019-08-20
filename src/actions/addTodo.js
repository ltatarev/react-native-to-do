import { ADD_TODO, TOGGLE_TODO } from './actionTypes';

export const addTodo = (id, name, listId) => ({
  type: ADD_TODO,
  payload: {
    id,
    name,
    listId,
  },
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: {
    id,
  },
});
