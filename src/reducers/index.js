import { combineReducers } from 'redux';

import usersReducer from './users';
import currentUserReducer from './currentUser';
import todoReducer from './todo';
import visibilityFilterReducer from './visibilityFilter';
import listReducer from './list';

const rootReducer = combineReducers({
  usersReducer,
  currentUserReducer,
  todoReducer,
  visibilityFilterReducer,
  listReducer,
});

export default rootReducer;
