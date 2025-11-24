import React, { useState } from 'react';
import { updateSolicitud } from '../../api/solicitudes';

const getStatusClasses = (estado) => {
    switch (estado) {
        case 'nuevo': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'en_proceso': return 'bg-blue-100 text-blue-800 border-blue-300';
        case 'resuelto': return 'bg-green-100 text-green-800 border-green-300';
        default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
}

export default function SupportRequestItem({ solicitud, onLoadData }) {
    const [respuesta, setRespuesta] = useState(solicitud.respuesta || '');
    const [isSaving, setIsSaving] = useState(false);

    const save = async (dataToUpdate) => {
        setIsSaving(true);
        try {
            await updateSolicitud(solicitud.id, dataToUpdate);
            onLoadData();
        } catch (error) {
            console.error('Error al actualizar solicitud:', error);
            alert('Hubo un error al guardar.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveResponse = () => {
        if (!respuesta) return alert('La respuesta no puede estar vacía.');
        save({ respuesta });
    };

    return (
        <div className={`border p-4 mb-4 rounded-lg shadow-md ${getStatusClasses(solicitud.estado)}`}>
            <div className="flex justify-between items-start mb-3">
                <h4 className="text-xl font-bold text-indigo-700">
                    {solicitud.titulo} <span className="text-gray-500 font-normal text-sm">({solicitud.cliente})</span>
                </h4>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(solicitud.estado)}`}>
                    {solicitud.estado.toUpperCase().replace('_', ' ')}
                </span>
            </div>
            
            <p className="text-gray-700 mb-4">{solicitud.descripcion}</p>

            <div className="flex space-x-2 mb-4">
                <button
                    onClick={() => save({ estado: 'en_proceso' })}
                    disabled={isSaving || solicitud.estado === 'resuelto'}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50 transition"
                >
                    Marcar En Proceso
                </button>
                <button
                    onClick={() => save({ estado: 'resuelto' })}
                    disabled={isSaving}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50 transition"
                >
                    Marcar Resuelto
                </button>
            </div>

            <div className="pt-4 border-t border-gray-300 flex space-x-2 items-center">
                <input
                    placeholder="Redactar respuesta"
                    value={respuesta}
                    onChange={(e) => setRespuesta(e.target.value)}
                    className="flex-grow border border-gray-300 p-2 rounded focus:outline-none focus:border-indigo-500"
                />
                <button
                    onClick={handleSaveResponse}
                    disabled={isSaving}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50 transition"
                >
                    {isSaving ? 'Guardando...' : 'Guardar Respuesta'}
                </button>
            </div>
        </div>
    );
}