import { useEffect, useState } from "react";

export default function Ohms() {
  const [ohmValues, setOhmValues] = useState({
    voltage: 0,
    resistance: 0,
    current: 0,
    wattage: 0,
  });

  function calculate() {
    if (ohmValues.current === 0 && ohmValues.wattage === 0 ) {
        const newCurent = ohmValues.voltage / ohmValues.resistance;
        const newWattage = Math.pow(ohmValues.voltage, 2);
        setOhmValues({...ohmValues, current: newCurent.toFixed(2), wattage: newWattage.toFixed(2)});
    } else if (ohmValues.voltage === 0 && ohmValues.resistance === 0) {
        const newVoltage = ohmValues.wattage / ohmValues.current;
        const newResistance = newVoltage / ohmValues.current;
        setOhmValues({...ohmValues, voltage: newVoltage.toFixed(2), resistance: newResistance.toFixed(2)});
    } else if (ohmValues.voltage === 0 && ohmValues.wattage === 0) {
        const newVoltage = ohmValues.current * ohmValues.resistance;
        const newWattage = ohmValues.current * newVoltage;
        setOhmValues({...ohmValues, voltage: newVoltage.toFixed(2), wattage: newWattage.toFixed(2)});
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
            <label htmlFor="voltage">VOLTAGE (Volt)</label>
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
            <label htmlFor="voltage">RESISTANCE (Ohm)</label>
            <input
              type="number"
              value={ohmValues.resistance}
              onChange={(e) =>
                setOhmValues({ ...ohmValues, resistance: e.target.value })
              }
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
            <label>CURRENT (Amp)</label>
            <input
              type="number"
              value={ohmValues.current}
              onChange={(e) =>
                setOhmValues({ ...ohmValues, current: e.target.value })
              }
              max="400"
            />
            <input
              type="range"
              value={ohmValues.current}
              onChange={(e) =>
                setOhmValues({ ...ohmValues, current: e.target.value })
              }
              step="0.01"
            />
          </div>

          <div className="form__section">
            <label>WATTAGE (Watt)</label>
            <input
              type="number"
              value={ohmValues.wattage}
              onChange={(e) =>
                setOhmValues({ ...ohmValues, wattage: e.target.value })
              }
              max="400"
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
