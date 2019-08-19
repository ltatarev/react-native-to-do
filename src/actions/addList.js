export const ADD_LIST = 'ADD_LIST';
export const SET_CURRENT_LIST = 'SET_CURRENT_LIST';

let nextListId = 0;

export const addList = (name, userId) => ({
  type: ADD_LIST,
  payload: {
    id: nextListId++,
    name,
    userId,
  },
});

export const setCurrentList = (userId, id) => ({
  type: SET_CURRENT_LIST,
  payload: {
    userId,
    id,
  },
});
