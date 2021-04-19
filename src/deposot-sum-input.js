import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DepositSumInput = ({ onDepositSumChange, deposit }) => {
  const [sum, changeSum] = useState();

  useEffect(() => {
    changeSum(deposit);
  }, []);

  function applyNewDepositSum() {
    // Some validation would be nice to implement
    onDepositSumChange(sum);
  }

  return (
    <div>
      <div className="input-group mb-3">
        <input onChange={(e) => changeSum(e.target.value)} value={sum} type="text" className="form-control" placeholder="Enter deposit sum" aria-label="Input amount" aria-describedby="basic-addon2" />
        <div className="input-group-append">
          <button onClick={() => applyNewDepositSum()} className="btn btn-outline-secondary" type="button">Set Deposit</button>
        </div>
      </div>
    </div>
  );
};

export default DepositSumInput;

DepositSumInput.propTypes = {
  deposit: PropTypes.number,
  onDepositSumChange: PropTypes.func,
};
