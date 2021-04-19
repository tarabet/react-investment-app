import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

export default class Menu extends Component {
  render() {
    return (
      <div data-testid="app-menu" style={{ display: 'flex', textAlign: 'center' }}>
        <Link data-testid="menu-table-link" to="/table"><Button variant="primary">Table</Button></Link>
                &nbsp;
        <Link data-testid="menu-chart-link" to="/chart"><Button variant="primary">Chart</Button></Link>
      </div>
    );
  }
}
