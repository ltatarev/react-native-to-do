export const selectCurrentUser = state => {
  if (state.currentUserReducer) {
    const allUsers = state.currentUserReducer[0];

    if (allUsers.currentUser != null) {
      return allUsers.currentUser;
    }
  }

  return null;
};

export const selectCurrentUsername = state => {
  const userId = selectCurrentUser(state);

  if (userId != null) {
    return state.usersReducer[userId].username;
  }

  return null;
};
