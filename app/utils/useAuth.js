import { jwtDecode } from 'jwt-decode';
import { getRoleString } from './getRoleString';

export function useAuth(navigate) {
  const getAuthDetails = () => {
    const token = window.localStorage.getItem('session');
    if (!token) return { isAuthenticated: false, role: null };

    const parsedToken = JSON.parse(token);
    let decodedToken;

    try {
      decodedToken = jwtDecode(parsedToken);
    } catch (e) {
      // If decode fails, remove malformed token
      window.localStorage.removeItem('session');
      return { isAuthenticated: false, role: null };
    }

    if (!decodedToken?.exp) {
      return { isAuthenticated: false, role: null };
    }

    const currentDate = Date.now();
    const exp = decodedToken.exp * 1000;

    if (currentDate >= exp) {
      window.localStorage.removeItem('session');
      if (navigate) navigate('/login'); // for protected routing
      return { isAuthenticated: false, role: null };
    }

    const role = getRoleString(Number(decodedToken.role));
    return { isAuthenticated: true, role };
  };

  return getAuthDetails();
}
