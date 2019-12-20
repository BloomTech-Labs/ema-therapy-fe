import React from 'react';
import styles from '../../styles/theme';
import Ring from './Ring';

const DateRings = ({ moodList }) => {
  const getMoodColor = (length, offset) => {
    let index;
    if (length > 3) index = length - 3 + offset;
    else if (length === 2) index = length - 2 + offset;
    else index = 0;

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

export default DateRings;
