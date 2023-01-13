const AUTHORIZED_ROLES = ["ADMIN", "USER"];

export const isUserRoleAuthorized = (role) => {
  return AUTHORIZED_ROLES.includes(role);
};
