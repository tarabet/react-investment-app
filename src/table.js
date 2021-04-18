import React from 'react';

import PropTypes from 'prop-types';
import { calculateTimeSeries } from './utils';

const Table = ({ riskLevelSelected, supportedRisksCalculations, deposit }) => {
  const cone = supportedRisksCalculations.filter((item) => item.riskLevel === riskLevelSelected)[0];
  const fee = 0.01;

  const timeSeries = calculateTimeSeries({
    mu: cone.mu,
    sigma: cone.sigma,
    years: 10,
    initialSum: deposit,
    monthlySum: 200,
    fee,
  });

  const months = timeSeries.median.map((v, idx) => idx);
  const dataGood = timeSeries.upper95.map((v) => v.y);
  const dataMedian = timeSeries.median.map((v) => v.y);
  const dataBad = timeSeries.lower05.map((v) => v.y);

  const rows = months.map((entry, idx) => (
    <tr key={entry.toString() + idx.toString()}>
      <td>{entry}</td>
      <td>{dataGood[idx]}</td>
      <td>{dataMedian[idx]}</td>
      <td>{dataBad[idx]}</td>
    </tr>
  ));

  const tableHeader = React.createElement('tr', {}, [
    React.createElement('th', { key: 'month' }, 'month'),
    React.createElement('th', { key: 'good' }, 'good'),
    React.createElement('th', { key: 'median' }, 'median'),
    React.createElement('th', { key: 'bad' }, 'bad'),
  ]);

  return (
    <table>
      <thead>
        {tableHeader}
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  deposit: 0,
  riskLevelSelected: null,
};

Table.propTypes = {
  deposit: PropTypes.number,
  supportedRisksCalculations: PropTypes.arrayOf(PropTypes.object),
  riskLevelSelected: PropTypes.number,
};

export default Table;
