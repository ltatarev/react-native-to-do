export const selectCurrentList = state => {
  const allLists = state.currentUserReducer[0];

  if (allLists.currentList != null) {
    return allLists.currentList;
  }

  return null;
};

export const selectCurrentListName = state => {
  const listId = selectCurrentList(state);

  if (state.listReducer[listId] != null) {
    return state.listReducer[listId].name;
  }

  return null;
};
