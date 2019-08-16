export const ADD_LIST = 'ADD_LIST';

let nextListId = 0;

export const addList = content => ({
  type: ADD_LIST,
  payload: {
    id: nextListId++,
    content,
  },
});
