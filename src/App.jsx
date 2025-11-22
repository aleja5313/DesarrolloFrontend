import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/Login';
import NewRequestForm from './components/ClientPanel/NewRequestForm';
import MyRequestsList from './components/ClientPanel/MyRequestsList';
import AssignedRequests from './components/SupportPanel/AssignedRequests';
import AllRequests from './components/AdminPanel/AllRequests';
import Stats from './components/AdminPanel/Stats';

function AppInner() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <Login />;

  return (
    <div style={{ padding: 20 }}>
      <div>
        <strong>Usuario:</strong> {user.username} - <strong>Rol:</strong> {user.role}
        <button onClick={logout} style={{ marginLeft: 10 }}>Cerrar sesión</button>
      </div>

      {user.role === 'cliente' && (
        <div>
          <NewRequestForm />
          <MyRequestsList />
        </div>
      )}

      {user.role === 'soporte' && (
        <div>
          <AssignedRequests />
        </div>
      )}

      {user.role === 'admin' && (
        <div>
          <AllRequests />
          <Stats />
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
