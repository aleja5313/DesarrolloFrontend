import React, { useEffect, useState } from 'react';
import { getEstadisticas } from '../../api/solicitudes';

export default function Stats() {
  const [stats, setStats] = useState({});
  const load = async () => {
    const res = await getEstadisticas();
    setStats(res);
  };
  useEffect(()=>{ load(); }, []);
  return (
    <div>
      <h3>Estadísticas</h3>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}
