export const getFollowingUsers = (usersList, select) => {
  if (select === "Following") {
    return usersList.filter((item) => item.following === true);
  } else if (select === "Follow") {
    return usersList.filter((item) => item.following === false);
  } else {
    return usersList;
  }
};
