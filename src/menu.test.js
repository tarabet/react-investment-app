import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Menu from './menu';

describe('Tests menu component', () => {
  beforeAll(() => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>,
    );
  });

  it('Both links should be present with correct href params', () => {
    expect(screen.getByTestId('menu-table-link')).toBeInTheDocument();
    expect(screen.getByTestId('menu-table-link')).toHaveAttribute('href', '/table');
    expect(screen.getByTestId('menu-chart-link')).toBeInTheDocument();
    expect(screen.getByTestId('menu-chart-link')).toHaveAttribute('href', '/chart');
  });
});
