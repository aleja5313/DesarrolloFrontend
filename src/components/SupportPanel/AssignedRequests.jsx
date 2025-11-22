import React, { useEffect, useState } from 'react';
import { getSolicitudes, updateSolicitud } from '../../api/solicitudes';

export default function AssignedRequests() {
  const [list, setList] = useState([]);
  const load = async () => {
    const res = await getSolicitudes();
    setList(res);
  };
  useEffect(()=>{ load(); }, []);

  const save = async (id, campo) => {
    await updateSolicitud(id, campo);
    load();
  };

  return (
    <div>
      <h3>Solicitudes (soporte)</h3>
      {list.map(s=>(
        <div key={s.id} style={{ border:'1px solid #ddd', margin:6, padding:6 }}>
          <strong>{s.titulo}</strong> - {s.cliente}<br/>
          {s.descripcion}<br/>
          Estado: {s.estado}<br/>
          <button onClick={()=>save(s.id, { estado: 'en_proceso' })}>Marcar en proceso</button>
          <button onClick={()=>save(s.id, { estado: 'resuelto' })}>Marcar resuelto</button>
          <div>
            <input placeholder="Respuesta" id={'r'+s.id} />
            <button onClick={()=> {
              const val = document.getElementById('r'+s.id).value;
              save(s.id, { respuesta: val });
            }}>Guardar respuesta</button>
          </div>
        </div>
      ))}
    </div>
  );
}
