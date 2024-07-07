import jwt from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    const token = window.localStorage.getItem('session');
    const parsedToken = JSON.parse(token);
    if (!parsedToken) return false;

    const decodedToken = jwt.decode(parsedToken);
    if (!decodedToken || !decodedToken.exp) return false;

    const currentDate = Date.now();
    const exp = decodedToken.exp * 1000;
    const isValid = currentDate < exp;
    if (!isValid) {
      window.localStorage.removeItem('session');
      navigate('/login');
    }
    return isValid;
  };

  return isAuthenticated();
}
