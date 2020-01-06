import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/theme';
import Ring from './Ring';

const DateRings = ({ moodList }) => {
  const getMoodColor = (length, ringNum) => {
    let index;
    if (length >= 3) index = length - 3 + ringNum;
    else index = ringNum;

    let color = '';
    switch (moodList[index].mood) {
      case 1:
        color = styles.rosyPink;
        break;
      case 2:
        color = styles.sherbertOrange;
        break;
      case 3:
        color = styles.brightYellow;
        break;
      case 4:
        color = styles.cerulean;
        break;
      case 5:
        color = styles.tealGreen;
        break;
      default:
        break;
    }
    return color;
  };

  return (
    <>
      {moodList.length >= 1 && (
        <Ring
          color={getMoodColor(moodList.length, 0)}
          className="ring inner-ring"
        />
      )}
      {moodList.length >= 2 && (
        <Ring
          color={getMoodColor(moodList.length, 1)}
          size="32"
          className="ring middle-ring"
        />
      )}
      {moodList.length >= 3 && (
        <Ring
          color={getMoodColor(moodList.length, 2)}
          size="36"
          className="ring outer-ring"
        />
      )}
    </>
  );
};

DateRings.propTypes = {
  moodList: PropTypes.arrayOf(
    PropTypes.shape({
      mood: PropTypes.number.isRequired,
      id: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      anxietyLevel: PropTypes.number,
      text: PropTypes.string,
      sleep: PropTypes.number,
      weather: PropTypes.string,
    }),
  ).isRequired,
};

export default DateRings;
