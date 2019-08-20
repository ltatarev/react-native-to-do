export const selectLoggedUser = state => {
  const allUsers = state.usersReducer;
  const currentUserId = state.currentUser;

  if (currentUserId) {
    return allUsers[currentUserId];
  }

  return null;
};
