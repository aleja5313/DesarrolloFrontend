import React, { useState, useContext } from 'react';
import { createSolicitud } from '../../api/solicitudes';
import { AuthContext } from '../../context/AuthContext';

export default function NewRequestForm({ onCreated }) {
  const { user } = useContext(AuthContext);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handle = async (e) => {
    e.preventDefault();
    if (!titulo || !descripcion) return alert('Complete los campos');
    await createSolicitud({ cliente: user.username, titulo, descripcion });
    setTitulo(''); setDescripcion('');
    if (onCreated) onCreated();
    alert('Solicitud enviada');
  };

  return (
    <form onSubmit={handle}>
      <h3>Nueva solicitud</h3>
      <div><input placeholder="Título" value={titulo} onChange={e=>setTitulo(e.target.value)} required /></div>
      <div><textarea placeholder="Descripción" value={descripcion} onChange={e=>setDescripcion(e.target.value)} required /></div>
      <button type="submit">Crear</button>
    </form>
  );
}
