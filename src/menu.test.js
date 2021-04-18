import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Menu from './menu';

describe('Menu', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>,
    );

    expect(screen.getByText('Table')).toBeInTheDocument();
    // expect(screen.getByText('Table')).toHaveAttribute('href', '/table');
    expect(screen.getByText('Chart')).toBeInTheDocument();
    // expect(screen.getByText('Chart')).toHaveAttribute('href', '/chart');
  });
});
