import React, { useEffect, useState } from 'react';
import { getSolicitudes } from '../../api/solicitudes';

export default function AllRequests() {
  const [list, setList] = useState([]);
  const load = async () => {
    const res = await getSolicitudes();
    setList(res);
  };
  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <h3>Todas las solicitudes</h3>
      {list.map(s => (
        <div key={s.id} style={{ border:'1px solid #ccc', margin:6, padding:6 }}>
          <strong>{s.titulo}</strong> - {s.cliente}<br/>
          Estado: {s.estado} - Fecha: {s.fecha}<br/>
        </div>
      ))}
    </div>
  );
}
