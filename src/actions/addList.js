import { ADD_LIST, SET_CURRENT_LIST } from './actionTypes';

export const addList = (id, name, userId) => ({
  type: ADD_LIST,
  payload: {
    id,
    name,
    userId,
  },
});

export const setCurrentList = (id, userId) => ({
  type: SET_CURRENT_LIST,
  payload: {
    id,
    userId,
  },
});
