import Chart from 'chart.js';
import React, { Component } from 'react';

import utils from '../../utils/utils';

import './Graph.scss';

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart: null,
    };
  }
  chartRef = React.createRef();

  // Component Life cycle method start

  componentDidMount() {
    this.getChartDetails();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.dataItem !== this.props.dataItem) {
      this.getChartDetails();
    }
  }

  // Component Life cycle method end

  // Getter start

  getChartDetails() {
    if (!utils.isNull(this.state.chart)) {
      this.state.chart.destroy();
    }
    let chartData = this.props.dataItem;
    const myChartRef = this.chartRef.current.getContext('2d');
    let chart = new Chart(myChartRef, {
      type: 'line',
      data: {
        //Bring in data
        labels: chartData[0] || [],
        datasets: [
          {
            label: `Covid ${chartData[2]}`,
            data: chartData[1] || [],
            backgroundColor: this.props.color.backgroundColor,
            borderColor: this.props.color.borderColor,
            pointBackgroundColor: this.props.color.pointBackgroundColor,
            fill: true,
            borderWidth: 2.5,
          },
        ],
      },
      options: {
        //Customize chart options
        responsive: true,
        duration: 0,
        maintainAspectRatio: true,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
      },
    });
    this.setState({
      chart: chart,
    });
  }

  // Getter end
  // ------------ Render ----------------

  render() {
    return (
      <div style={{ width: '95%' }}>
        <canvas className="graph-class" id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default Graph;
