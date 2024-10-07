import React from 'react';

function ControlCard({ title, currentValue, range, description, color, icon, min, max }) {
  // Determinar si el valor actual está fuera del rango
  const isOutOfRange = currentValue < min || currentValue > max;

  return (
    <div className={`p-6 rounded-lg shadow-md w-full text-center ${isOutOfRange ? 'border-red-500 bg-red-100' : 'border-green-500 bg-green-100'}`}>
  <div className="flex flex-col items-center">
    {/* Título y símbolo de pregunta */}
    <div className="flex items-center">
      <span className="text-sm font-semibold">{title}</span>
      <div className="group relative cursor-pointer">
        <span className="text-xs text-gray-500">❓</span>
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 bg-white p-2 rounded shadow-lg text-sm transition-opacity duration-300">
          {description}
        </div>
      </div>
    </div>

    {/* Valor actual */}
    <div className="text-3xl font-bold mt-4">
      {currentValue}{icon}
    </div>

    {/* Rango esperado */}
    <div className="mt-2">
      <span className="text-xs text-gray-700">Expected Range: {range}</span>
    </div>
  </div>
</div>

  );
}

export default ControlCard;

