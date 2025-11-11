import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

// Ruta simple: comprobar que la app responde
app.get("/ping", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Ruta de prueba: consumir una API pública (salida a Internet)
app.get("/test/public", async (req, res) => {
  try {
    const r = await axios.get("https://devapi.solgas.com.pe/", { timeout: 10000 });
    res.json({ ok: true, data: r.data });
  } catch (e) {
    res.status(502).json({ ok: false, error: e.message });
  }
});

// Azure asigna el puerto en process.env.PORT
app.listen(process.env.PORT || 8080);