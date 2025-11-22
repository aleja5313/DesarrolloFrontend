import React, { createContext, useState } from 'react';
import { loginApi } from '../api/solicitudes';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const s = localStorage.getItem('user');
    return s ? JSON.parse(s) : null;
  });

  const login = async ({ username, role }) => {
    // llamada simulada
    const res = await loginApi({ username, role });
    localStorage.setItem('user', JSON.stringify(res));
    setUser(res);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
