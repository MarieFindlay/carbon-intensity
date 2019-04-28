import { TIMES_ON_AXIS, SCROLL_DIRECTIONS, SCROLL_SENSITIVITY } from './constants';

export const getReadableDateTime = dateTimeString => {
    return `${dateTimeString.substring(6,7)} ${dateTimeString.substring(9,10)} ${dateTimeString.substring(11,16)}`
  }
  
export const getDefaultDataInView = data => {
    return data.slice(-TIMES_ON_AXIS);
}
  
export const getGraphReadyData = data => {
    const XYCoordinates = data.map(halfHour => {
        const x = getReadableDateTime(halfHour.from);
        const y = halfHour.intensity.actual || halfHour.intensity.forecast;
        return { x, y };
    })
    const formattedData = [
        {
        "id": "Intensity:",
        "data": XYCoordinates
        }
    ]
    return formattedData;
}

export const detectScroll = (e, scrollPosition) => {
    if ((e.pageX - scrollPosition) > SCROLL_SENSITIVITY) {
        return SCROLL_DIRECTIONS.RIGHT;
    } else if ((e.pageX - scrollPosition) < -SCROLL_SENSITIVITY) {
        return SCROLL_DIRECTIONS.LEFT;
    } else return false;
}