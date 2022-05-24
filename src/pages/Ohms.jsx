import { useEffect, useState } from "react";

export default function Ohms() {
  const [ohmValues, setOhmValues] = useState({
    voltage: 0,
    resistance: 0,
    current: 0,
    wattage: 0,
  });

  function calculate() {
    let current = ohmValues.current > 0;
    let voltage = ohmValues.voltage > 0;
    let resistance = ohmValues.resistance > 0;
    let wattage = ohmValues.wattage > 0;
    let newWattage = 0;
    let newVoltage = 0;
    let newResistance = 0;
    let newCurrent = 0;

    if (current && resistance) {
      newWattage = (Math.pow(ohmValues.current, 2) * ohmValues.resistance).toFixed(2);
      newVoltage = (ohmValues.resistance * ohmValues.current).toFixed(2);
      setOhmValues({...ohmValues, voltage: newVoltage, wattage: newWattage});
    } else if (current && voltage) {
      newWattage = (ohmValues.current * ohmValues.voltage).toFixed(2);
      newResistance = (ohmValues.voltage / ohmValues.current).toFixed(2);
      setOhmValues({...ohmValues, resistance: newResistance, wattage: newWattage});
    } else if (wattage && current) {
      newVoltage = (ohmValues.wattage / ohmValues.current).toFixed(2);
      newResistance = (ohmValues.wattage / Math.pow(ohmValues.current, 2)).toFixed(2);
      setOhmValues({...ohmValues, voltage: newVoltage, resistance: newResistance});
    } else if (voltage && resistance) {
      newWattage = (Math.pow(ohmValues.voltage, 2) / ohmValues.resistance).toFixed(2);
      newCurrent = (ohmValues.voltage / ohmValues.resistance).toFixed(2); 
      setOhmValues({...ohmValues, wattage: newWattage, current: newCurrent});
    } else if (wattage && voltage) {
      newCurrent = (ohmValues.wattage / ohmValues.voltage).toFixed(2);
      newResistance = (Math.pow(ohmValues.voltage, 2) / ohmValues.wattage).toFixed(2);
      setOhmValues({...ohmValues, current: newCurrent, resistance: newResistance});
    } else if (current && voltage) {
      newWattage = (ohmValues.voltage * ohmValues.current).toFixed(2);
      newResistance = (ohmValues.voltage / ohmValues.current).toFixed(2);
      setOhmValues({...ohmValues, wattage: newWattage, resistance: newResistance});
    } else if (wattage && resistance) {
      newVoltage = (Math.sqrt(ohmValues.wattage * ohmValues.resistance)).toFixed(2);
      newCurrent = (Math.sqrt(ohmValues.wattage / ohmValues.resistance)).toFixed(2);
      setOhmValues({...ohmValues, voltage: newVoltage, current: newCurrent});
    }
  }

  function reset() {
    setOhmValues({voltage: 0, resistance: 0, current: 0, wattage: 0});
  }

  return (
    <div className="app__body">
      <header className="app__header">
        <h1>Ohm's Law</h1>
        <h5>Enter any two known values and press Calculate</h5>
      </header>

      <section className="app__section">
        <div className="form form--grid">
          <div className="form__section">
            <label htmlFor="voltage"><span>VOLTAGE (Volt)</span> <span>max: 16.8</span></label>
            <input
              type="text"
              value={ohmValues.voltage}
              onChange={(e) =>
                setOhmValues({ ...ohmValues, voltage: e.target.value })
              }
            />
            <input
              type="range"
              value={ohmValues.voltage}
              onChange={(e) =>
                setOhmValues({ ...ohmValues, voltage: e.target.value })
              }
              max="16.8"
              min="0"
              step="0.01"
            />
          </div>

          <div className="form__section">
            <label htmlFor="voltage"><span>RESISTANCE (Ohm) </span> <span>max: 3</span></label>
            <input
              type="number"
              value={ohmValues.resistance}
              onChange={(e) =>
                setOhmValues({ ...ohmValues, resistance: e.target.value })
              }
              step="0.01"
              max="3"
            />
            <input
              type="range"
              value={ohmValues.resistance}
              onChange={(e) =>
                setOhmValues({ ...ohmValues, resistance: e.target.value })
              }
              max="3"
              min="0"
              step="0.01"
            />
          </div>

          <div className="form__section">
            <label><span>CURRENT (Amp)</span><span>max: 60</span></label>
            <input
              type="number"
              value={ohmValues.current}
              onChange={(e) =>
                setOhmValues({ ...ohmValues, current: e.target.value })
              }
              max="60"
              step="0.01"
            />
            <input
              type="range"
              value={ohmValues.current}
              onChange={(e) =>
                setOhmValues({ ...ohmValues, current: e.target.value })
              }
              max="60"
              step="0.01"
            />
          </div>

          <div className="form__section">
            <label><span>WATTAGE (Watt)</span><span>max: 400</span></label>
            <input
              type="number"
              value={ohmValues.wattage}
              onChange={(e) =>
                setOhmValues({ ...ohmValues, wattage: e.target.value })
              }
              max="400"
              step="0.01"
            />
            <input
              type="range"
              value={ohmValues.wattage}
              onChange={(e) =>
                setOhmValues({ ...ohmValues, wattage: e.target.value })
              }
              max="400"
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div className="app__buttons">
          <button onClick={reset} className="btn btn--reset">
            Reset
          </button>
          <button onClick={calculate} className="btn btn--action">
            Calculate
          </button>
        </div>
      </section>
    </div>
  );
}
