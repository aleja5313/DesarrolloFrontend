import React, { useState, useContext } from 'react';
import { createSolicitud } from '../../api/solicitudes';
import { AuthContext } from '../../context/AuthContext';

export default function NewRequestForm({ onCreated }) {
  const { user } = useContext(AuthContext);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e) => {
    e.preventDefault();
    if (!titulo || !descripcion) return alert('Complete los campos Título y Descripción');
    
    setLoading(true);
    try {
      await createSolicitud({ cliente: user.username, titulo, descripcion });
      setTitulo(''); 
      setDescripcion('');
      if (onCreated) onCreated();
      alert('Solicitud enviada exitosamente.');
    } catch (error) {
        console.error('Error al crear solicitud:', error);
        alert('Hubo un error al enviar la solicitud.');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl mb-8 border border-gray-200">
      <h3 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-4">
        Crear Nueva Solicitud
      </h3>
      
      <form onSubmit={handle} className="space-y-4">
        
        <div>
          <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
            Título:
          </label>
          <input 
            id="titulo"
            placeholder="Resumen breve del problema" 
            value={titulo} 
            onChange={e=>setTitulo(e.target.value)} 
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
          />
        </div>
        
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción Detallada:
          </label>
          <textarea 
            id="descripcion"
            placeholder="Detalles, pasos para reproducir, impacto..." 
            value={descripcion} 
            onChange={e=>setDescripcion(e.target.value)} 
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none"
          />
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200 shadow-md disabled:opacity-50"
        >
          {loading ? 'Enviando...' : 'Enviar Solicitud'}
        </button>
        
      </form>
    </div>
  );
}