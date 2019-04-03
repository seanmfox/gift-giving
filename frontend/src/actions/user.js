export const UPDATEUSER = 'UPDATEUSER';
export const LOGOUT = 'LOGOUT';

export const updateUser = (user) => {
  return {
    type: UPDATEUSER,
    payload: {user}
  }
};

export const logoutUser = () => {
  return {
    type: LOGOUT
  }
};
