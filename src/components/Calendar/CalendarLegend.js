import React from 'react';
import styled from 'styled-components';
import MoodLegendIcon from '../MoodLegendIcon';
import styles from '../../styles/theme';

const CalendarLegend = () => {
  return (
    <Wrapper>
      <div className="legend-item">
        <MoodLegendIcon color={styles.tealGreen} size="12" />
        <p>Happy</p>
      </div>
      <div className="legend-item">
        <MoodLegendIcon color={styles.cerulean} size="12" />
        <p>Fine</p>
      </div>
      <div className="legend-item">
        <MoodLegendIcon color={styles.brightYellow} size="12" />
        <p>Normal</p>
      </div>
      <div className="legend-item">
        <MoodLegendIcon color={styles.sherbertOrange} size="12" />
        <p>Sad</p>
      </div>
      <div className="legend-item">
        <MoodLegendIcon color={styles.rosyPink} size="12" />
        <p>Unhappy</p>
      </div>
    </Wrapper>
  );
};

export default CalendarLegend;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px 4px;

  .legend-item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
      margin: unset;
      color: ${styles.darkJungleGreen};
      font-size: 14px;
      padding-left: 4px;
      font-weight: 500;
    }
  }
`;
