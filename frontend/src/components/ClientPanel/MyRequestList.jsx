import React, { useEffect, useState, useContext, useCallback } from 'react';
import { getSolicitudes } from '../../api/solicitudes';
import { AuthContext } from '../../context/AuthContext';

const getStatusClasses = (estado) => {
    switch (estado) {
        case 'nuevo': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'en_proceso': return 'bg-blue-100 text-blue-800 border-blue-300';
        case 'resuelto': return 'bg-green-100 text-green-800 border-green-300';
        default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
}

export default function MyRequestsList() {
    const { user } = useContext(AuthContext);
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getSolicitudes({ cliente: user.username });
            setList(res);
        } catch (error) {
            console.error('Error al cargar solicitudes:', error);
            setList([]);
        } finally {
            setLoading(false);
        }
    }, [user.username]);

    useEffect(() => { 
        load(); 
    }, [load]);

    return (
        <div className="p-6 bg-white shadow-lg rounded-xl mt-8">
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">
                Mis Solicitudes
            </h3>

            {loading && (
                <p className="text-indigo-600 text-center">Cargando tus solicitudes...</p>
            )}

            {!loading && list.length === 0 && (
                <p className="text-gray-500 text-center p-4 bg-gray-50 rounded-lg">
                    No tienes solicitudes registradas. Usa el formulario de arriba para crear una.
                </p>
            )}

            <div className="space-y-4">
                {list.map(s => (
                    <div 
                        key={s.id} 
                        className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <strong className="text-lg text-indigo-700">{s.titulo}</strong>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusClasses(s.estado)}`}>
                                {s.estado.toUpperCase().replace('_', ' ')}
                            </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3 text-sm">{s.descripcion}</p>
                        
                        <div className="p-3 mt-3 border-t border-gray-100 bg-gray-50 rounded-md">
                            <p className="text-xs font-medium text-gray-700">Respuesta de Soporte:</p>
                            <p className="text-sm italic text-gray-800 mt-1">
                                {s.respuesta || '— Pendiente de respuesta —'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}