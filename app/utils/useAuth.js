import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if JWT is present in localStorage
    const token = localStorage.getItem('session');
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
}
