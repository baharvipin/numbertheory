import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';

import covidAction from '../../store/covidcases/covidAction';
import Dropdown from '../../constants/component/dropdown/Dropdown';
import Graph from './Graph';
import utils from '../../utils/utils';

import './Dashboard.scss';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: 30,
      dayString: 'Last 30 Days',
    };
  }

  // lifecycle method start
  componentDidMount() {
    this.props.dispatch(covidAction.fetchCovidCases(this.state.day));
  }

  // handle function start
  reFetchData() {
    this.props.dispatch(covidAction.invalidateCovidCases());
    this.props.dispatch(covidAction.fetchCovidCases(this.state.day));
  }

  selectDays = async (value) => {
    let data;
    if (value === 'Last 7 Days') {
      data = 7;
    } else if (value === 'Last 15 Days') {
      data = 15;
    } else data = 30;

    await this.setState(() => {
      return {
        ...this.state,
        day: data,
        dayString: value,
      };
    });
    this.reFetchData();
  };

  // handle function end

  // Getter start--------
  getChartData() {
    let caseType = ['cases', 'deaths', 'recovered'];
    let allArrayData = [];
    if (
      utils.isDataEmpty(this.props.covidCases) ||
      utils.isDataEmpty(this.props.covidCases.covidCases) ||
      utils.isDataEmpty(this.props.covidCases.covidCases.cases)
    )
      return [];
    else {
      for (let type of caseType) {
        let lastDataPoint;
        let xData = [];
        let yData = [];
        for (const [key, value] of Object.entries(
          this.props.covidCases.covidCases[type]
        )) {
          if (lastDataPoint) {
            xData.push(key);
            yData.push(value - lastDataPoint);
          }
          lastDataPoint = value;
        }
        allArrayData.push([xData, yData, type]);
      }
    }
    return allArrayData;
  }
  //Getter end-----------

  renderSelectLastDays() {
    const items = ['Last 30 Days', 'Last 15 Days', 'Last 7 Days'];
    return (
      <span className="mr-2">
        <Dropdown
          controlId="formBasicDropdown-1"
          as="select"
          value={this.state.dayString}
          dropdownItems={items}
          handleFormData={(e) => this.selectDays(e.target.value)}
        />
      </span>
    );
  }

  render() {
    const color = [
      {
        backgroundColor: ['rgba(204, 16, 52, 0.3)'],
        borderColor: ['rgba(238, 38, 73, 0.8)'],
        pointBackgroundColor: 'rgba(238, 38, 73, 1)',
      },
      {
        backgroundColor: ['rgba(174, 214, 241, 0.3)'],
        borderColor: ['rgba(93, 173, 226, 0.8)'],
        pointBackgroundColor: 'rgba(93, 173, 226, 1)',
      },
      {
        backgroundColor: ['rgba(130, 224, 170, 0.3)'],
        borderColor: ['rgba(29, 131, 72 0.8)'],
        pointBackgroundColor: 'rgba(29, 131, 72, 1)',
      },
    ];
    const chartData = this.getChartData();
    return utils.isDataEmpty(this.props.covidCases) ? (
      <h2>No Graph data found</h2>
    ) : (
      <div className="app-padding">
        {this.renderSelectLastDays()}
        <div className="m-auto">
          <Row>
            {chartData.map((item, index) => {
              return (
                <Col sm={6} xs={12} className="graph" key={index}>
                  <Graph
                    color={color[index]}
                    key={`str_${index}`}
                    dataItem={item}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { covidCases } = state;
  return {
    covidCases: covidCases,
  };
};

export default connect(mapStateToProps)(Dashboard);
