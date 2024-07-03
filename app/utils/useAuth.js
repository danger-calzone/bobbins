export function useAuth() {
  const isAuthenticated = () => {
    const token = window.localStorage.getItem('session');
    return !!JSON.parse(token);
  };

  return isAuthenticated();
}
