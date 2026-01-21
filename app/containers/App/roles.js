export const ROLE = {
  USER: 0,
  ADMIN: 1,
};

export const isAdminRole = role => Number(role) === ROLE.ADMIN;

export const roleToString = role => {
  switch (Number(role)) {
    case ROLE.ADMIN:
      return 'admin';
    case ROLE.USER:
      return 'user';
    default:
      return null;
  }
};
