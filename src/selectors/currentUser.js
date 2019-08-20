export const selectCurrentUser = state => {
  if (state.currentUserReducer) {
    const allUsers = state.currentUserReducer[0];

    if (allUsers.currentUser != null) {
      return allUsers.currentUser;
    }
  }

  return null;
};
