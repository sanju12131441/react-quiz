import React, {Component} from 'react';

import {AXIS_STYLES, VALUE_STYLES} from './../Styles/axisStyle';

export default class Axis extends Component {

  getAxis() {
    const {xAxisAmount, width, axisColor} = this.props;
    const sum = this.sumDataValues();
    const axisInterval = parseInt(sum / xAxisAmount);
    let axis = [];
    for (let x = 1; x <= 10; x += 1) {
      axis.push({
        value: x,
        styles: {
          ...AXIS_STYLES,
          bottom: `${x*16}%`,
          width: width,
          background: axisColor
        }
      });
    }

    console.log(axis);
    return axis;
  }
  sumDataValues() {
    return this.props.data.reduce((sum, item) => sum += item.value, 0);
  }

  render() {
    const {axisValueColor} = this.props;
    const axis = this.getAxis();

    const valueStyles = {
      ...VALUE_STYLES,
      color: axisValueColor
    };
    return (
            <div>
                {axis.map((axis, index) => (
                                    <div className="sbc-bar-axis" 
                                         style={axis.styles} 
                                         key={index}>
                                        <span style={valueStyles}>{axis.value}</span>
                                    </div>)
                          )}
            </div>
            );
  }
}