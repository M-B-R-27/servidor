const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
 
// =====================
//  CONFIGURACIÓN
// =====================
app.use(cors());
app.use(express.json());
 
// Guardamos los clientes con su ID único
const clientes = [];
 
// =====================
//  SSE — ESCUCHAR MENSAJES
// =====================
app.get("/escuchar", (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
 
    const clienteId = req.query.clienteId;
    console.log(`Cliente conectado: ${clienteId}`);
 
    const nuevoCliente = { id: clienteId, res };
    clientes.push(nuevoCliente);
 
    req.on("close", () => {
        const index = clientes.indexOf(nuevoCliente);
        if (index !== -1) clientes.splice(index, 1);
        console.log(`Cliente desconectado: ${clienteId}`);
    });
});
 
// =====================
//  POST — ENVIAR MENSAJE
// =====================
app.post("/mensaje", (req, res) => {
    const { mensaje, clienteId } = req.body;
 
    if (!mensaje) {
        return res.status(400).json({ error: "Mensaje vacío" });
    }
 
    console.log(`Mensaje de ${clienteId}: ${mensaje}`);
 
    clientes
        .filter(c => c.id !== clienteId)
        .forEach(c => {
            c.res.write(`data: ${JSON.stringify({ mensaje })}\n\n`);
        });
 
    res.json({ ok: true });
});
 
// =====================
//  INICIAR SERVIDOR
// =====================
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});