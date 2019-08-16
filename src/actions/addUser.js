export const ADD_USER = 'ADD_USER';

let nextUserId = 0;

export const addUser = content => ({
  type: ADD_USER,
  payload: {
    id: ++nextUserId,
    content,
  },
});
