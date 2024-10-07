import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'; // Importamos los componentes de Leaflet
import 'leaflet/dist/leaflet.css'; // Estilos de Leaflet
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Estilos del calendario

// Componente para manejar el clic en el mapa y actualizar la ubicación seleccionada
function LocationMarker({ setLocation }) {
  const [position, setPosition] = useState(null);

  // Configuración de eventos en el mapa para capturar el clic
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      setLocation({ lat, lng }); // Actualizar la ubicación en el estado principal
    },
  });

  return position === null ? null : (
    <Marker position={position} />
  );
}

function InputsForm({ setLocation, setDate, setCropType }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCropType, setSelectedCropType] = useState('Maize');

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDate(date); // Actualizar la fecha en el estado de la app principal
  };

  const handleCropTypeChange = (e) => {
    setSelectedCropType(e.target.value);
    setCropType(e.target.value); // Actualizar el tipo de cultivo en el estado de la app principal
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Select Inputs</h2>

      {/* Mapa interactivo para seleccionar la ubicación */}
      <label className="block text-sm font-medium text-gray-700">Select Location on Map</label>
      <MapContainer
        center={[37.09024,-95.712891]} // Coordenadas iniciales (Bogotá)
        zoom={4}
        style={{ height: '300px', width: '100%' }}
        className="mt-2 mb-4"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setLocation={setLocation} />
      </MapContainer>

      {/* Input para el calendario */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Select Date</label>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        className="mt-2 block w-full p-2 border rounded"
      />

      {/* Input para el tipo de cultivo */}
      <label className="block text-sm font-medium text-gray-700 mt-4">Crop Type</label>
      <select
        value={selectedCropType}
        onChange={handleCropTypeChange}
        className="mt-2 block w-full p-2 border rounded"
      >
        <option value="Maize">Maize</option>
        <option value="Wheat">Wheat</option>
        <option value="Rice">Rice</option>
        {/* Añadir más tipos de cultivo */}
      </select>
    </div>
  );
}

export default InputsForm;
