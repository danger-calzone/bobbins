import { decode } from 'jsonwebtoken';

import { getRoleString } from './getRoleString';

export function useAuth(navigate) {
  const getAuthDetails = () => {
    const token = window.localStorage.getItem('session');
    if (!token) return { isAuthenticated: false, role: null };

    const parsedToken = JSON.parse(token);
    const decodedToken = decode(parsedToken);
    if (!decodedToken || !decodedToken.exp)
      return { isAuthenticated: false, role: null };

    const currentDate = Date.now();
    const exp = decodedToken.exp * 1000;
    const isValid = currentDate < exp;

    if (!isValid) {
      window.localStorage.removeItem('session');
      navigate('/login'); // Only works if navigate is passed in
      return { isAuthenticated: false, role: null };
    }

    const role = getRoleString(Number(decodedToken.role));
    return { isAuthenticated: true, role };
  };

  return getAuthDetails();
}
