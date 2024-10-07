import React from 'react';
import ControlCard from './ControlCard'; // Asegúrate de que la ruta sea correcta

function ControlPanel({ temperature, wind, evapotranspiration, runoff, humidity, groundwater }) {
  return (
    <div className=" grid grid-cols-1 gap-1">
      {/* Temperature */}
      <ControlCard
        title="Temperature"
        currentValue={temperature}
        range="21-30°C"
        description="Temperature affects plant growth, photosynthesis, and transpiration."
        color="bg-yellow-200"
        icon="°C"
        min={21}
        max={30}
      />

      {/* Wind */}
      <ControlCard
        title="Wind"
        currentValue={wind}
        range="15-20 km/h"
        description="Wind influences evaporation and pollen dispersion."
        color="bg-blue-200"
        icon=" km/h"
        min={15}
        max={20}
      />

      {/* Evapotranspiration */}
      <ControlCard
        title="Evapotranspiration"
        currentValue={evapotranspiration}
        range="5-8 mm"
        description="Evapotranspiration is the combined loss of water from soil and plants."
        color="bg-green-200"
        icon=" mm"
        min={5}
        max={8}
      />

      {/* Runoff */}
      <ControlCard
        title="Runoff"
        currentValue={runoff}
        range="5-8 mm"
        description="Runoff occurs when the soil is saturated and can't absorb more water."
        color="bg-red-200"
        icon=" mm"
        min={5}
        max={8}
      />

      {/* Humidity */}
      <ControlCard
        title="Humidity"
        currentValue={humidity}
        range="40-70%"
        description="Air humidity is essential for the photosynthesis process."
        color="bg-brown-200"
        icon="%"
        min={40}
        max={70}
      />

      {/* Groundwater */}
      <ControlCard
        title="Groundwater"
        currentValue={groundwater}
        range="5-10 mm"
        description="Groundwater is a vital source of hydration for deep roots."
        color="bg-blue-300"
        icon=" mm"
        min={5}
        max={10}
      />
    </div>
  );
}

export default ControlPanel;
