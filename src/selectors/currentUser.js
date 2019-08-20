export const selectCurrentUser = state => {
  const allUsers = state.currentUserReducer[0];

  if (allUsers.currentUser != null) {
    return allUsers.currentUser;
  }

  return null;
};
