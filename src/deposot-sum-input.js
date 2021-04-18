import React, { useState } from 'react';
import PropTypes from 'prop-types';

const DepositSumInput = ({ onDepositSumChange }) => {
  const [sum, changeSum] = useState();

  function applyNewDepositSum() {
    // Some validation would be nice to implement
    onDepositSumChange(sum);
  }

  return (
    <div>
      <div className="input-group mb-3">
        <input onChange={(e) => changeSum(e.target.value)} type="text" className="form-control" placeholder="Enter deposit sum" aria-label="Input amount" aria-describedby="basic-addon2" />
        <div className="input-group-append">
          <button onClick={() => applyNewDepositSum()} className="btn btn-outline-secondary" type="button">Button</button>
        </div>
      </div>
    </div>
  );
};

export default DepositSumInput;

DepositSumInput.propTypes = {
  onDepositSumChange: PropTypes.func,
};
