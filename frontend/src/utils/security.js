const AUTHORIZED_ROLES = ["ADMIN", "USER"];

export const isUserRoleAuthorized = (role) => {
  return AUTHORIZED_ROLES.includes(role);
};

export const isAdmin = (role) => {
  return role === AUTHORIZED_ROLES[0];
};
