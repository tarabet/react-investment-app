import React from 'react';
import PropTypes from 'prop-types';

// Not sure about purpose of minRiskLevel and maxRiskLevel I would clarify it with stakeholders. Currently ignoring them.
const RiskLevelSelector = ({ onChangeRiskLevel, riskLevels }) => {
  function onChange(event) {
    const riskLevel = parseInt(event.target.value, 10);
    onChangeRiskLevel(riskLevel);
  }

  function renderOptions() {
    return riskLevels.map((item) => <option key={item.toString()} value={item}>{item}</option>);
  }

  return (
    <div>
      Risk level:
      <div className="input-group mb-3">
        <select onChange={onChange} className="custom-select" id="inputGroupSelect02">
          {/* Something better should be implemented here */}
          {riskLevels?.length > 0 ? renderOptions() : <option value="">No data to chose</option>}
        </select>
        <div className="input-group-append">
          <label className="input-group-text" htmlFor="inputGroupSelect02">Risk Level</label>
        </div>
      </div>
    </div>
  );
};

export default RiskLevelSelector;

RiskLevelSelector.defaultProps = {
  riskLevels: [],
  minRiskLevel: 3,
  maxRiskLevel: 25,
  onChangeRiskLevel: () => {},
};

RiskLevelSelector.propTypes = {
  riskLevels: PropTypes.arrayOf(PropTypes.number),
  minRiskLevel: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  maxRiskLevel: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
  onChangeRiskLevel: PropTypes.func,
};
