import {isVertical} from './barStyles';

const STYLES = {
  position: 'absolute',
  transition: 'width .3s ease, height .3s ease'
};

export default function getBarContainerStyles(props, barWidth, index) {
  const {margin, orientation} = props;
  const chartLeftMargin = margin / 2;

  if (isVertical(orientation)) {
    return {
      ...STYLES,
      height: '100%',
      bottom: 0,
      left: index === 0 ? chartLeftMargin : ((barWidth + margin) * index + chartLeftMargin)
    };
  }
  return {
    ...STYLES,
    width: '100%',
    top: (barWidth + margin) * index,
    left: 0
  };
}