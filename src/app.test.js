import React from 'react';

import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import App from './app';

import cones from '../cones.json';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(cones),
}));

describe('Tests app component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('Should render correct number of options when data is successfully fetched', async () => {
    await waitFor(() => render(<App />));

    expect(await screen.findByTestId('app-container')).toBeInTheDocument();
    expect(await screen.findByTestId('app-menu')).toBeInTheDocument();
    expect(await screen.findByText('Risk level:')).toBeInTheDocument();
    expect(await screen.findByText('Set Deposit')).toBeInTheDocument();
  });

  it('Should generate correct number of risk options', async () => {
    await waitFor(() => render(<App />));

    const options = await screen.getAllByTestId('risk-option');
    expect(options.length).toEqual(cones.length);
  });

  it('Should show appropriate message when api returns reject', async () => {
    fetch.mockImplementationOnce(() => Promise.reject(new Error('something bad happened')));

    await waitFor(() => render(<App />));

    expect(await screen.findByText('Wait for data to be fetched')).toBeInTheDocument();
  });

  // Looks a bit shaky, but it demonstrates user interaction with drop-down
  it('Should trigger appropriate function when risk level is selected', async () => {
    const SECOND_MONTH_RETURN_ON_10_LEVEL_RISK = '1228.154591163118';
    const { getByTestId, getByText } = await waitFor(() => render(<App />));

    const riskSelector = getByTestId('risk-select');

    fireEvent.change(riskSelector, { target: { value: 10 } });

    expect(getByText(SECOND_MONTH_RETURN_ON_10_LEVEL_RISK)).toBeInTheDocument();
  });
});
