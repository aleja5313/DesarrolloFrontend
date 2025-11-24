import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('cliente');

  const handle = async (e) => {
    e.preventDefault();
    if (!username) return alert('Escribe tu nombre');

    const finalUsername = username.trim() === '' ? role : username;
    
    await login({ username: finalUsername, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Sistema de Solicitudes
        </h2>
        
        <form onSubmit={handle} className="space-y-6">
        
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de usuario:
            </label>
            <input 
              id="username"
              type="text"
              value={username} 
              onChange={e => setUsername(e.target.value)}
              placeholder="Ej. juan, maria, admin"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              required
            />
          </div>
          
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Rol:
            </label>
            <select 
              id="role"
              value={role} 
              onChange={e => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
            >
              <option value="cliente">Cliente</option>
              <option value="soporte">Soporte</option>
              <option value="admin">Administrador</option>
            </select>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-md"
          >
            Entrar
          </button>
          
        </form>
        
      </div>
    </div>
  );
}