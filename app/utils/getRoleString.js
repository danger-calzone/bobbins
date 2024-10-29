export const roleMapping = {
  1: 'admin',
  2: 'user',
  // Add other roles as needed
};

export function getRoleString(roleId) {
  return roleMapping[roleId] || 'guest'; // default to 'guest' or another role if not found
}
