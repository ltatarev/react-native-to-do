import { ADD_USER, LOGIN, LOG_OUT } from './actionTypes';

export const addUser = (id, username) => ({
  type: ADD_USER,
  payload: {
    id,
    username,
  },
});

export const login = id => ({
  type: LOGIN,
  payload: {
    id,
  },
});

export const logOut = id => ({
  type: LOG_OUT,
  payload: {
    id,
  },
});
