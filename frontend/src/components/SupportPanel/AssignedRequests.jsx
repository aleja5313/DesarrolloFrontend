import React, { useEffect, useState, useCallback } from 'react';
import { getSolicitudes } from '../../api/solicitudes';
import SupportRequestItem from './SupportRequestItem'; 

export default function AssignedRequests() {
    const [list, setList] = useState([]);
    const load = useCallback(async () => {
        const res = await getSolicitudes(); 
        setList(res);
    }, []);

    useEffect(() => { 
        load(); 
    }, [load]); 

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Solicitudes Asignadas (Soporte)</h3>
            {list.length === 0 && <p className="text-gray-500">No hay solicitudes asignadas en este momento.</p>}
            
            <div className="space-y-4">
                {list.map(s => (
                    <SupportRequestItem 
                        key={s.id} 
                        solicitud={s} 
                        onLoadData={load} 
                    />
                ))}
            </div>
        </div>
    );
}