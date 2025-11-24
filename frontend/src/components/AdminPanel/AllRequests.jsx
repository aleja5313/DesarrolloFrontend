import React, { useEffect, useState, useCallback } from 'react';
import { getSolicitudes } from '../../api/solicitudes';

const ESTADOS = ['nuevo', 'en_proceso', 'resuelto'];

export default function AllRequests() {
    const [list, setList] = useState([]);
    const [filters, setFilters] = useState({ cliente: '', estado: '' }); 
    const [loading, setLoading] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const validFilters = Object.fromEntries(
                Object.entries(filters).filter(([_, value]) => value !== '')
            );
            
            const res = await getSolicitudes(validFilters);
            setList(res);
        } catch (error) {
            console.error('Error al cargar solicitudes:', error);
            setList([]);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => { 
        load(); 
    }, [load]);

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
                Listado General de Solicitudes
            </h3>
          
            <div className="flex flex-wrap gap-4 p-4 mb-6 bg-gray-50 rounded-md border border-gray-200">
                <input 
                    name="cliente" 
                    placeholder="Filtrar por Cliente" 
                    value={filters.cliente} 
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                />
                
                <select 
                    name="estado" 
                    value={filters.estado} 
                    onChange={handleChange} 
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-auto"
                >
                    <option value="">-- Filtrar por Estado --</option>
                    {ESTADOS.map(estado => (
                        <option key={estado} value={estado}>
                            {estado.charAt(0).toUpperCase() + estado.slice(1).replace('_', ' ')}
                        </option>
                    ))}
                </select>
                
            </div>

            {loading && <p className="text-indigo-600">Cargando solicitudes...</p>}
            
            {!loading && list.length === 0 && (
                <p className="text-gray-500">No se encontraron solicitudes con los filtros aplicados.</p>
            )}

            <div className="space-y-4">
                {list.map(s => (
                    <div key={s.id} className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300">
                        <div className="flex justify-between items-center">
                            <strong className="text-lg text-indigo-700">{s.titulo}</strong>
                            <span className="px-2 py-1 text-xs font-semibold bg-gray-200 rounded-full">
                                {s.estado.toUpperCase().replace('_', ' ')}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">Cliente: <span className="font-medium">{s.cliente}</span></p>
                        <p className="text-xs text-gray-400">Fecha: {s.fecha || 'N/A'}</p> 
                    </div>
                ))}
            </div>
        </div>
    );
}