export const selectCurrentList = state => {
  const allUsers = state.currentUserReducer[0];

  if (allUsers.currentList != null) {
    return allUsers.currentList;
  }

  return null;
};
