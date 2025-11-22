Este proyecto es una aplicación frontend construida en React + Vite que simula la gestión de solicitudes en una empresa, dependiendo del rol del usuario:
Cliente, Soporte y Administrador.

La aplicación permite:
Crear solicitudes (Cliente)
Ver y responder solicitudes (Soporte)
Administrar, filtrar y ver estadísticas (Administrador)

La API está simulada, usando archivos locales y estados internos, para cumplir con el requisito de la prueba sin necesidad de un backend real

Tecnologías Usadas
Frontend
React 18
Vite
TailwindCSS
React Router
Context API para manejo de estado
Recharts (para estadísticas)
Estructura del código
/components → Componentes reutilizables
/pages → Pantallas por rol (Cliente / Soporte / Admin)
/context → Manejo de autenticación y solicitude
/services → Simulación de API
