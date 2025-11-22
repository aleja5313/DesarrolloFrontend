const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let solicitudes = [];
let idCounter = 1;

app.post('/login', (req, res) => {
  const { username, role } = req.body; 
  res.json({ token: 'fake-token', username, role });
});

app.get('/solicitudes', (req, res) => {
  const { cliente, estado } = req.query;
  let result = solicitudes;
  if (cliente) result = result.filter(s => s.cliente === cliente);
  if (estado) result = result.filter(s => s.estado === estado);
  res.json(result);
});

app.post('/solicitudes', (req, res) => {
  const s = {
    id: idCounter++,
    cliente: req.body.cliente || 'anonimo',
    titulo: req.body.titulo || '',
    descripcion: req.body.descripcion || '',
    estado: 'pendiente',
    respuesta: null,
    fecha: new Date().toISOString()
  };
  solicitudes.push(s);
  res.status(201).json(s);
});

app.get('/solicitudes/:id', (req, res) => {
  const id = Number(req.params.id);
  const s = solicitudes.find(x => x.id === id);
  if (!s) return res.status(404).json({ error: 'No encontrado' });
  res.json(s);
});

app.put('/solicitudes/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = solicitudes.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'No encontrado' });

  if (req.body.estado) solicitudes[idx].estado = req.body.estado;
  if (req.body.respuesta) solicitudes[idx].respuesta = req.body.respuesta;

  res.json(solicitudes[idx]);
});

app.get('/estadisticas', (req, res) => {
  const conteo = solicitudes.reduce((acc, s) => {
    acc[s.estado] = (acc[s.estado] || 0) + 1;
    return acc;
  }, {});
  res.json(conteo);
});

const PORT = 4000;
app.listen(PORT, () => console.log('API running on http://localhost:' + PORT));
