import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { Button } from 'react-bootstrap';

export default class Menu extends Component {
  render() {
    return (
      <div style={{ display: 'flex', textAlign: 'center' }}>
        <Link to="/table"><Button variant="primary">Table</Button></Link>
                &nbsp;
        <Link to="/chart"><Button variant="primary">Chart</Button></Link>
      </div>
    );
  }
}
