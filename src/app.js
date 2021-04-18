import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';

import Menu from './menu';
import RiskLevelSelector from './risk-level-selector';
import Table from './table';
import Chart from './chart';
import { API_RISK_CALCULATIONS, HEADERS_JSON, DEFAULT_RISK_LEVEL } from './constants';
import { apiGet, buildSupportedRiskLevelsArr } from './utils';
import DepositSumInput from './deposot-sum-input';

export default () => {
  const [state, setState] = useState({
    deposit: 0,
    months: 12,
    riskLevels: null,
    riskLevelSelected: null,
    supportedRisksCalculations: null,
  });

  function onChangeRiskLevel(riskLevelSelected) {
    setState({ ...state, riskLevelSelected });
  }

  function onChangeDeposit(deposit) {
    setState({ ...state, deposit });
  }

  useEffect(() => {
    apiGet(API_RISK_CALCULATIONS, HEADERS_JSON)
      .then((data) => {
        const supportedRiskLevels = buildSupportedRiskLevelsArr(data);

        setState({
          riskLevelSelected: supportedRiskLevels?.indexOf(DEFAULT_RISK_LEVEL) !== -1
            ? DEFAULT_RISK_LEVEL
            : supportedRiskLevels[0],
          riskLevels: supportedRiskLevels?.length > 0 ? supportedRiskLevels : null,
          supportedRisksCalculations: data,
        });
      })
      .catch(() => console.log('Oops, cannot get data from ', API_RISK_CALCULATIONS)); // some better error handling should be implemented
  }, []);

  return (
    <Router>
      <Container>
        <Row className="p-3">
          <Col>
            <Menu />
          </Col>
        </Row>
        <Row className="p-3">
          <Col>
            <RiskLevelSelector
              riskLevels={state.riskLevels}
              minRiskLevel={3}
              maxRiskLevel={25}
              onChangeRiskLevel={onChangeRiskLevel}
            />
          </Col>
        </Row>
        <Row className="p-3">
          <Col>
            <DepositSumInput
              onDepositSumChange={onChangeDeposit}
            />
          </Col>
        </Row>
        {/* Not sure it is best solution for conditional
        rendering for classic react router but here it works just fine */}
        {state.supportedRisksCalculations
          ? (
            <Row>
              <Route
                exact
                path="/"
                component={() => <Table months={state.months} deposit={state.deposit} riskLevelSelected={state.riskLevelSelected} supportedRisksCalculations={state.supportedRisksCalculations} />}
              />
              <Route
                path="/table"
                component={() => <Table months={state.months} deposit={state.deposit} riskLevelSelected={state.riskLevelSelected} supportedRisksCalculations={state.supportedRisksCalculations} />}
              />
              <Route
                path="/chart"
                component={() => <Chart months={state.months} deposit={state.deposit} riskLevelSelected={state.riskLevelSelected} supportedRisksCalculations={state.supportedRisksCalculations} />}
              />
            </Row>
          )
          : <div>Wait for data to be fetched</div>}
      </Container>
    </Router>
  );
};
