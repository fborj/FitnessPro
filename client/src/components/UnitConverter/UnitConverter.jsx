import React, { useState } from 'react';
import './UnitConverter.css';

const UnitConverter = ({ allowNegative = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [weightLbs, setWeightLbs] = useState('');
  const [weightKg, setWeightKg] = useState('');

  const handleInputChange = (e, setter) => {
    const inputValue = e.target.value;
    if (!allowNegative && inputValue < 0) {
      return; // Prevent negative values
    }
    setter(inputValue);
  };

  const convertHeightToCm = () => {
    const feet = parseFloat(heightFeet) || 0;
    const inches = parseFloat(heightInches) || 0;
    const totalCm = (feet * 30.48) + (inches * 2.54);
    setHeightCm(totalCm.toFixed(1));
  };

  const convertHeightToFeetInches = () => {
    const cm = parseFloat(heightCm) || 0;
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    setHeightFeet(feet.toString());
    setHeightInches(inches.toString());
  };

  const convertWeight = (value, from) => {
    if (from === 'lbs') {
      const kg = (parseFloat(value) || 0) * 0.453592;
      setWeightKg(kg.toFixed(1));
      setWeightLbs(value);
    } else {
      const lbs = (parseFloat(value) || 0) * 2.20462;
      setWeightLbs(lbs.toFixed(1));
      setWeightKg(value);
    }
  };

  return (
    <div className="converter-container">
      <button 
        className="converter-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Close Converter' : 'Unit Converter'}
      </button>

      {isOpen && (
        <div className="converter-panel">
          <h3>Unit Converter</h3>
          
          <div className="converter-section">
            <h4>Height Converter</h4>
            <div className="height-inputs">
              <div>
                <input
                  type="number"
                  value={heightFeet}
                  onChange={(e) => handleInputChange(e, setHeightFeet)}
                  placeholder="Feet"
                />
                <input
                  type="number"
                  value={heightInches}
                  onChange={(e) => handleInputChange(e, setHeightInches)}
                  placeholder="Inches"
                />
                <button onClick={convertHeightToCm}>→ cm</button>
              </div>
              <div>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => {
                    handleInputChange(e, setHeightCm);
                    convertHeightToFeetInches();
                  }}
                  placeholder="Centimeters"
                />
                <button onClick={convertHeightToFeetInches}>→ ft/in</button>
              </div>
            </div>
          </div>

          <div className="converter-section">
            <h4>Weight Converter</h4>
            <div className="weight-inputs">
              <div>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => handleInputChange(e, (value) => convertWeight(value, 'lbs'))}
                  placeholder="Pounds"
                />
                <span>lbs</span>
              </div>
              <div>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => handleInputChange(e, (value) => convertWeight(value, 'kg'))}
                  placeholder="Kilograms"
                />
                <span>kg</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
