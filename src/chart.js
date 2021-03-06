import React, { Component } from 'react';
import { Chart as ChartJs } from 'chart.js';
import PropTypes from 'prop-types';
import { calculateTimeSeries } from './utils';

// Consider renaming component for not collide with chart.js dependency
class Chart extends Component {
  componentDidMount() {
    const { supportedRisksCalculations } = this.props;

    if (supportedRisksCalculations) {
      this.drawChart();
    }
  }

  drawChart() {
    const { riskLevelSelected, supportedRisksCalculations, deposit } = this.props;
    const { mu, sigma } = supportedRisksCalculations.filter((cone) => cone.riskLevel === riskLevelSelected)[0];
    const fee = 0.01;

    const timeSeries = calculateTimeSeries({
      mu,
      sigma,
      years: 10,
      initialSum: deposit,
      monthlySum: 200,
      fee,
    });

    const labels = timeSeries.median.map((v, idx) => (idx % 12 === 0 ? idx / 12 : ''));
    const dataMedian = timeSeries.median.map((v) => v.y);
    const dataGood = timeSeries.upper95.map((v) => v.y);
    const dataBad = timeSeries.lower05.map((v) => v.y);

    const data = {
      datasets: [
        {
          data: dataGood,
          label: 'Good performance',
          borderColor: 'rgba(100, 255, 100, 0.2)',
          fill: false,
          pointRadius: 0,
        },
        {
          data: dataMedian,
          label: 'Median performance',
          borderColor: 'rgba(100, 100, 100, 0.2)',
          fill: false,
          pointRadius: 0,
        },
        {
          data: dataBad,
          label: 'Bad performance',
          borderColor: 'rgba(255, 100, 100, 0.2)',
          fill: false,
          pointRadius: 0,
        },
      ],
      labels,
    };

    const options = {
      responsive: false,
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Years',
          },
          gridLines: {
            drawOnChartArea: false,
          },
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Valuation (EUR)',
          },
        }],
      },
    };

    const config = {
      type: 'line',
      data,
      options,
    };

    const { canvas } = this;
    const context = canvas.getContext('2d');

    const myChart = new ChartJs(context, config); // eslint-disable-line no-unused-vars
  }

  render() {
    const { supportedRisksCalculations } = this.props;

    if (!supportedRisksCalculations) {
      return <div>No data is provided</div>;
    }

    return (
      <div>
        <canvas
          data-testId="chart"
          ref={(ref) => this.canvas = ref} // eslint-disable-line no-return-assign
          width={600}
          height={400}
        />
      </div>
    );
  }
}

export default Chart;

Chart.defaultProps = {
  deposit: 1000,
};

Chart.propTypes = {
  deposit: PropTypes.number,
  supportedRisksCalculations: PropTypes.arrayOf(PropTypes.object),
  riskLevelSelected: PropTypes.number,
};

// These are commented tests for Chart component. I had to so because it requires 'canvas' dependency to run correctly.
// Unfortunately there's some mess with this dependency during deployment on AWS. I had to comment it to save time.

// import React from 'react';
//
// import { render, screen } from '@testing-library/react';
// import Chart from './chart';
//
// import cones from '../cones.json';
//
// describe('Tests menu component', () => {
//   beforeAll(() => {
//     render(
//       <Chart riskLevelSelected={cones[0].riskLevel} supportedRisksCalculations={cones} deposit={1000} />,
//     );
//   });
//
//   it('Should render chart correctly if all data is provided', () => {
//     expect(screen.getByTestId('chart')).toBeInTheDocument();
//   });
//
//   it('Should display appropriate message if data is not provided', () => {
//     render(<Chart />);
//
//     expect(screen.getByText('No data is provided')).toBeInTheDocument();
//   });
// });
