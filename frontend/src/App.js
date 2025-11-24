import React, { useState } from "react";

function App() {
  const [rol, setRol] = useState("");
  const [loggeado, setLoggeado] = useState(false);

  const iniciarSesion = () => {
    if (rol) {
      setLoggeado(true);
    } else {
      alert("Selecciona un rol");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      {!loggeado ? (
        <>
          <h2>Ingreso al sistema</h2>
          <p>Selecciona tu rol:</p>

          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="">-- Seleccionar --</option>
            <option value="cliente">Cliente</option>
            <option value="soporte">Soporte</option>
            <option value="admin">Administrador</option>
          </select>

          <br /><br />

          <button onClick={iniciarSesion}>Ingresar</button>
        </>
      ) : (
        <>
          <h2>Bienvenido ({rol})</h2>

          {rol === "cliente" && <p>Panel del cliente: pronto agregaremos tus solicitudes.</p>}
          {rol === "soporte" && <p>Panel de soporte: verás solicitudes asignadas.</p>}
          {rol === "admin" && <p>Panel administrador: verás reportes y estadísticas.</p>}
        </>
      )}
    </div>
  );
}

export default App;
