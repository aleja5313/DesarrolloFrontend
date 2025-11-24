import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './components/login';

import NewRequestForm from './components/ClientPanel/NewRequestForm';
import MyRequestsList from './components/ClientPanel/MyRequestsList';
import AssignedRequests from './components/SupportPanel/AssignedRequests';
import AllRequests from './components/AdminPanel/AllRequests';
import Stats from './components/AdminPanel/Stats';

function AppInner() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <Login />;

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-6">
        <div>
          <strong className="text-gray-700">Usuario:</strong> {user.username} - 
          <strong className="text-gray-700 ml-4">Rol:</strong> {user.role}
        </div>
        <button 
          onClick={logout} 
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
      </div>

      {user.role === 'cliente' && (
        <div className="p-4">
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