const express = require("express");
const cors = require("cors"); // Necesario para permitir la conexión desde el frontend
const app = express();
const PORT = 3000;

// Configuración necesaria
app.use(cors()); // Permite que el navegador acepte respuestas de este servidor
app.use(express.json()); // Permite que el servidor entienda el formato JSON que envías

// Ruta POST para la suma
app.post("/sumar", (req, res) => {
  // Extraemos los datos que vienen en el "body" del cliente
  // Nota: El cliente envía { num1, num2 }, así que los capturamos así:
  const { num1, num2 } = req.body;

  // Convertimos a número y sumamos
  const resultadoSuma = parseFloat(num1) + parseFloat(num2);

  console.log(`Petición recibida: ${num1} + ${num2} = ${resultadoSuma}`);

  // Enviamos la respuesta de vuelta al cliente
  res.json({
    resultado: resultadoSuma,
  });
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor educativo corriendo en http://localhost:${PORT}`);
});
