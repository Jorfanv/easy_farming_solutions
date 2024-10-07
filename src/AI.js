const axios = require("axios");
require("dotenv").config();

// Define el prompt del sistema
const systemPrompt = `
Eres un asistente virtual que sabe acerca de la agricultura y todas las mediciones meteorológicas, como temperatura, precipitación, viento, evapotranspiración, agua subterránea y otras. Me ayudarás a tomar decisiones informadas, dándome recomendaciones sobre mis cultivos y comparando el valor de las mediciones de mi territorio con unas ideales para mi cultivo.
`;

// Proporciona contexto
const context = `
Condiciones actuales:
- Temperatura: Excesivamente alta (35°C), indicando estrés por calor para la mayoría de los cultivos.
- Viento: Velocidad alta (24 km/h), lo que puede causar daño físico a las plantas y aumentar la evapotranspiración.
- Evapotranspiración: Alta (3 mm), sugiriendo una pérdida excesiva de agua del suelo.
- Escorrentía: Baja (2 mm), indicando una posible falta de riego o precipitación adecuada.
- Agua subterránea: Nivel aceptable (6 mm), aunque podría ser insuficiente si la evapotranspiración continúa alta.
- Humedad: Muy baja (30%), aumentando el estrés hídrico en el cultivo.

Condiciones ideales:
- Temperatura: Rango óptimo (21-30°C), proporcionando un ambiente adecuado para el crecimiento.
- Viento: Velocidad moderada (15-20 km/h), suficiente para la polinización sin causar daño significativo.
- Evapotranspiración: Rango adecuado (5-8 mm), equilibrio entre la pérdida de agua y la disponibilidad en el suelo.
- Escorrentía: Rango adecuado (5-8 mm), indicando un buen balance del riego o precipitación.
- Agua subterránea: Nivel adecuado (5-10 mm), garantizando suficiente humedad para el crecimiento.
- Humedad: Rango óptimo (40-70%), manteniendo un ambiente propicio para el desarrollo de la planta.

En resumen, las condiciones actuales presentan varios factores de estrés (temperatura, viento, evapotranspiración, escorrentía, humedad) que afectan negativamente al cultivo. Se necesitan medidas correctivas para acercarse a las condiciones ideales y asegurar un crecimiento saludable.
`;

// Función para realizar la solicitud a la API de Gemini
async function askGemini(userPrompt) {
  const apiUrl = "https://openrouter.ai/api/v1/chat/completions"; // URL de la API de OpenRouter
  const apiKey = process.env.OPENROUTER_API_KEY; // Reemplaza esto con tu clave de API de OpenRouter

  const data = {
    model: "google/gemini-flash-1.5", // Especifica el modelo de Gemini
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: context },
      { role: "user", content: userPrompt },
    ],
    max_tokens: 150, // Ajusta esto según tus necesidades
    temperature: 0.7, // Ajusta esto según tus necesidades
  };

  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    });

    console.log(
      "Respuesta de Gemini:",
      response.data.choices[0].message.content
    );
  } catch (error) {
    console.error("Error al llamar a la API de Gemini:", error);
  }
}

// Ejecuta la función
// askGemini();