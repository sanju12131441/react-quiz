import {Optional, isObject} from '../utils';

const STYLES = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  transition: 'height .3s ease, width .3s ease'
};

export const LABEL_STYLES = {
  position: 'absolute',
  bottom: -25,
  height: 20,
  textAlign: 'center',
  fontSize: 12,
  fontFamily: 'Roboto, Arial',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};

export default function getBarStyles({orientation, color}, barWidth, item) {
  if (isVertical(orientation)) {
    return {
      ...STYLES,
      height: `${item.percent}px`,
      width: barWidth,
      background: getBarColor(item, color)
    };
  }

  return {
    ...STYLES,
    height: barWidth,
    width: `${item.percent}%`,
    background: getBarColor(item, color)
  };
}

export function getBarWidth({margin, singleBarWidth, orientation}, {width, height, data}) {
  const allBarsWidth = ((isVertical(orientation) ? width : height) - data.length * margin);
  const defaultBarWidth = (allBarsWidth / data.length);
  return Optional(singleBarWidth).or(defaultBarWidth);
}

export function isVertical(orientation) {
  return orientation === 'vertical';
}

function getBarColor(item, color) {
  return isObject(item) ? (item.color || color) : color;
}