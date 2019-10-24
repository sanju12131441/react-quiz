import React, {Component} from 'react';

import Axis from './axis';

import {Optional, isObject, isDefined} from './../utils';
import getBarContainerStyles from './../Styles/barContainerStyles';
import getBarStyles, {getBarWidth, LABEL_STYLES} from './../Styles/barStyles';

class SimpleBarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {min: 0, max: 0, data: []};
    this.calculateChartSize = this.calculateChartSize.bind(this);
  }

  componentDidMount() {
    this.buildData(this.props.data);
    this.calculateChartSize();
    window.addEventListener('resize', this.calculateChartSize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.buildData(nextProps.data);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.calculateChartSize);
  }

  buildData(newData = []) {
    const result = this.buildObjectsList(newData);
    const max = this.getMax(result);
    const min = this.getMin(result);
    const data = this.calculatePercents(result, max);
    this.setState({
      min, max, data
    });
  }

  buildObjectsList(data) {
    return data.map(item => isObject(item) ? item : {value: item});
  }

  getMax(data) {
    return data.reduce((max, item) => item.value > max ? item.value : max, 0);
  }

  getMin(data) {
    return data.reduce((min, item) => item.value < min ? item.value : min, 0);
  }

  calculatePercents(data, max) { 
     data.forEach(dataObj => {
        switch (dataObj.value) {
            case 0:dataObj['percent'] = 5  
                break;
            case 1:dataObj['percent'] = 16
                break;
            case 2:dataObj['percent'] = 32
                break;
            case 3:dataObj['percent'] = 48
                break;
            case 4:dataObj['percent'] = 64
                break;
        }
    });

    return data;
  }

  calculateChartSize() {
    const {width, height} = this.props;
    const size = this.chart.getBoundingClientRect();
    this.setState({
      width: Optional(width).or(size.width),
      height: Optional(height).or(size.height)
    });
  }

  render() {
    const {className = '', enableAxis} = this.props;
    const {data, width, height} = this.state;
    const chartStyles = {
      width, height,
      position: 'relative'
    };

console.log(enableAxis);
    return (
            <div className={`simple-bar-chart ${className}`} style={chartStyles}
                 ref={chart => this.chart = chart}>
                <Axis {...this.props} {...this.state}/>
                {data.map((item, index) => this.renderBar(item, index))}
            </div>
            );
  }

  renderBar(item, index) {
    const barWidth = getBarWidth(this.props, this.state);
    const barContainerStyles = getBarContainerStyles(this.props, barWidth, index);
    const barStyles = getBarStyles(this.props, barWidth, item);
    const {margin, labelColor} = this.props;
    barStyles.background = item.color
    const labelStyles = {
      ...LABEL_STYLES,
      width: `calc(100% + ${margin}px)`,
      left: -1 * parseInt(margin / 2),
      color: labelColor
    };

    return (
            <div className="sbc-bar-container" 
                 style={barContainerStyles}
                 key={index}>
                <div className="sbc-bar" style={barStyles} title={item.label}>
                    {isDefined(item.label) ? <span style={labelStyles} title={item.label}>{item.label}</span> : null}            
                </div>
            </div>
            );
  }
}

SimpleBarChart.defaultProps = {
  data: [],
  color: '#7FB2E5',
  margin: 5,
  orientation: 'vertical',
  xAxisAmount: 4,
  axisColor: '#DFDFDF',
  axisValueColor: '#787878',
  enableAxis: true,
  labelColor: '#787878'
};

export default SimpleBarChart;