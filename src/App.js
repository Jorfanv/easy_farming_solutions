import Navbar from './components/Navbar';
import DiagramCultivo from './components/DiagramCultivo';
import InputsForm from './components/InputsForm';
import ControlPanel from './components/ControlPanel';
import React, { useState } from 'react';
import IaChat from './components/IaChat';

function App() {
  const [temperature, setTemperature] = useState(28);
  const [wind, setWind] = useState(18);
  const [evapotranspiration, setEvapotranspiration] = useState(7);
  const [runoff, setRunoff] = useState(6);
  const [humidity, setHumidity] = useState(65);
  const [groundwater, setGroundwater] = useState(9);

  const [location, setLocation] = useState('Illinois');
  const [date, setDate] = useState(new Date());
  const [cropType, setCropType] = useState('Corn');

  const updateDataBasedOnInputs = () => {
    if (location === 'Illinois' && cropType === 'Corn') {
      setTemperature(35);
      setWind(24);
      setEvapotranspiration(3);
      setRunoff(2);
      setHumidity(30);
      setGroundwater(6);
    } else if (location === 'Kansas' && cropType === 'Corn') {
      setTemperature(25);
      setWind(15);
      setEvapotranspiration(5);
      setRunoff(7);
      setHumidity(65);
      setGroundwater(8);
    }
  };

  React.useEffect(() => {
    updateDataBasedOnInputs();
  }, [location, date, cropType]);

  return (
    <div className=" bg-white">
      <Navbar />
      <div className="mx-auto mt-8 grid grid-cols-3 gap-0">
        <div className="col-span-1">
          <DiagramCultivo />
        </div>

        <div className="col-span-1">
          <ControlPanel
            temperature={temperature}
            wind={wind}
            evapotranspiration={evapotranspiration}
            runoff={runoff}
            humidity={humidity}
            groundwater={groundwater}
          />
        </div>

        <div className="col-span-1">
          <InputsForm setLocation={setLocation} setDate={setDate} setCropType={setCropType} />
          
          {/* Pasamos las mediciones actuales como props al componente IaChat */}
          <IaChat
            temperature={temperature}
            wind={wind}
            evapotranspiration={evapotranspiration}
            runoff={runoff}
            humidity={humidity}
            groundwater={groundwater}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
