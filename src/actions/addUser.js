export const ADD_USER = 'ADD_USER';
export const LOG_OUT = 'LOG_OUT';

let nextUserId = 0;

export const addUser = content => ({
  type: ADD_USER,
  payload: {
    id: ++nextUserId,
    content,
  },
});

export const logOut = content => ({
  type: LOG_OUT,
  payload: {
    id: content,
  },
});
