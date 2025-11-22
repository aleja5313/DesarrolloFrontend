import React, { useEffect, useState, useContext } from 'react';
import { getSolicitudes } from '../../api/solicitudes';
import { AuthContext } from '../../context/AuthContext';

export default function MyRequestsList() {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);

  const load = async () => {
    const res = await getSolicitudes({ cliente: user.username });
    setList(res);
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h3>Mis solicitudes</h3>
      {list.length === 0 && <p>No tienes solicitudes.</p>}
      {list.map(s => (
        <div key={s.id} style={{ border: '1px solid #ccc', margin: 6, padding: 6 }}>
          <strong>{s.titulo}</strong><br />
          {s.descripcion}<br />
          Estado: {s.estado}<br />
          Respuesta: {s.respuesta || '—'}
        </div>
      ))}
    </div>
  );
}
