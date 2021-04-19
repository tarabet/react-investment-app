import React from 'react';

import { render, screen } from '@testing-library/react';
import Chart from './chart';

import cones from '../cones.json';

describe('Tests menu component', () => {
  beforeAll(() => {
    render(
      <Chart riskLevelSelected={cones[0].riskLevel} supportedRisksCalculations={cones} deposit={1000} />,
    );
  });

  it('Should render chart correctly if all data is provided', () => {
    expect(screen.getByTestId('chart')).toBeInTheDocument();
  });

  it('Should display appropriate message if data is not provided', () => {
    render(<Chart />);

    expect(screen.getByText('No data is provided')).toBeInTheDocument();
  });
});
