export const actionTypes = {
  SET_USER_PROFILE: "SET_USER_PROFILE",
};

export const setUserProfile = (user) => ({
  type: actionTypes.SET_USER_PROFILE,
  payload: user,
});
