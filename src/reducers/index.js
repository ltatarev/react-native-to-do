import { combineReducers } from 'redux';

import usersReducer from './users';
import todoReducer from './todo';
import visibilityFilterReducer from './visibilityFilter';
import listReducer from './list';

const rootReducer = combineReducers({
  users: usersReducer,
  todos: todoReducer,
  visibilityFilter: visibilityFilterReducer,
  lists: listReducer,
});

export default rootReducer;
