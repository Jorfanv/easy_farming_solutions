import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function IaChat({ temperature, wind, evapotranspiration, runoff, humidity, groundwater }) {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleInputChange = (e) => {
    setQuestion(e.target.value);
  };

  // Generate the dynamic context based on the props
  const generateDynamicContext = () => {
    return `
      Current conditions:
      - Temperature: ${temperature}°C
      - Wind: ${wind} km/h
      - Evapotranspiration: ${evapotranspiration} mm
      - Runoff: ${runoff} mm
      - Groundwater: ${groundwater} mm
      - Humidity: ${humidity}%

      Ideal conditions:
      - Temperature: Optimal range (21-30°C), providing a suitable environment for growth.
      - Wind: Moderate speed (15-20 km/h), enough for pollination without significant damage.
      - Evapotranspiration: Adequate range (5-8 mm), balancing water loss and soil availability.
      - Runoff: Adequate range (5-8 mm), indicating a good balance of irrigation or precipitation.
      - Groundwater: Adequate level (5-10 mm), ensuring sufficient moisture for growth.
      - Humidity: Optimal range (40-70%), maintaining a favorable environment for plant development.

      In summary, current conditions present several stress factors (temperature, wind, evapotranspiration, runoff, humidity) that negatively affect the crops. Corrective measures are needed to approach ideal conditions and ensure healthy growth.
    `;
  };

  const askGemini = async (userPrompt) => {
    const apiUrl = "https://openrouter.ai/api/v1/chat/completions"; 
    const apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;

    const systemPrompt = `
      You are a virtual assistant who knows about agriculture and all meteorological measurements, such as temperature, precipitation, wind, evapotranspiration, groundwater, and others. You will help me make informed decisions, giving me recommendations on my crops and comparing the value of the measurements in my area with the ideal ones for my crop.
    `;

    const data = {
      model: "google/gemini-flash-1.5",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: generateDynamicContext() }, // Dynamic context based on props
        { role: "user", content: userPrompt },
      ],
      max_tokens: 150,
      temperature: 0.7,
    };

    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      });

      const aiResponse = response.data.choices[0].message.content;
      return aiResponse;
    } catch (error) {
      console.error("Error calling the Gemini API:", error);
      return "Error getting response from the AI.";
    }
  };

  const handleSend = async () => {
    if (question.trim() === '') return;

    setLoading(true);
    const userMessage = { role: 'user', content: question };
    setChatHistory((prev) => [...prev, userMessage]);

    const aiResponse = await askGemini(question);
    const aiMessage = { role: 'ai', content: aiResponse };

    setChatHistory((prev) => [...prev, aiMessage]);
    setQuestion('');
    setLoading(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <div className="mt-6 p-3 rounded-lg bg-gray-200">
      <label className="block text-sm font-medium text-gray-700">Ask the AI</label>

      <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md max-h-64 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Chat</h2>
        {chatHistory.map((message, index) => (
          <div key={index} className={`mb-2 p-2 rounded-lg ${message.role === 'ai' ? 'bg-blue-200 self-start' : 'bg-green-200 self-end'}`}>
            <strong>{message.role === 'ai' ? 'AI' : 'You'}:</strong> {message.content}
          </div>
        ))}
        <div ref={chatEndRef} /> {/* Element to scroll down */}
      </div>

      <textarea
        rows="3"
        value={question}
        onChange={handleInputChange}
        className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        placeholder="Type your question here..."
      ></textarea>

      <button
        onClick={handleSend}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}

export default IaChat;
