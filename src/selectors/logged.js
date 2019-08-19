export const selectLoggedUser = state => {
  const allUsers = state.userReducer;
  const currentUserId = state.currentUser;

  if (currentUserId) {
    return allUsers[currentUserId];
  }

  return null;
};
