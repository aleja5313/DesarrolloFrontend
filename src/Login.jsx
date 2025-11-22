import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('cliente');

  const handle = async (e) => {
    e.preventDefault();
    if (!username) return alert('Escribe tu nombre');
    await login({ username, role });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login (simulado)</h2>
      <form onSubmit={handle}>
        <div>
          <label>Nombre:</label><br />
          <input value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Rol:</label><br />
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="cliente">Cliente</option>
            <option value="soporte">Soporte</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
