import React from 'react';
import format from 'date-fns/format';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from './Card';
import moodToString from '../utils/moodToString';
import flower from '../assets/yellow-flower.svg';
import pot from '../assets/great-pot.svg';
import styles from '../styles/theme';

const formatDate = (timestamp, fmt) => {
  const ts = Number(timestamp);
  return format(new Date(ts), fmt);
};

function MoodPreview({ lastItem, count }) {
  return (
    <PreviewContainer>
      <DayWrapper>
        <p className="weekday">{formatDate(lastItem.createdAt, 'iii')}</p>
        <img src={flower} alt="flower" />
      </DayWrapper>
      <StyledMoodCard>
        <div>
          <p className="time">{formatDate(lastItem.createdAt, 'h:mm a')}</p>
          <p className="mood">{moodToString(lastItem.mood)}</p>
          <p className="count">{count > 1 ? `${count} entries` : '1 entry'}</p>
        </div>
      </StyledMoodCard>
    </PreviewContainer>
  );
}

MoodPreview.propTypes = {
  lastItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    mood: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
};

export default MoodPreview;

const PreviewContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  .weekday {
    color: #0c423b;
    font-size: 12px;
    width: 30px;
    margin-right: 6px;
    margin-bottom: 7px;
  }
`;

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StyledMoodCard = styled(Card)`
  padding: 7px 16px 8px;
  margin-bottom: 23px;
  height: 95px;
  width: 100%;
  background-image: url(${pot});
  background-repeat: no-repeat;
  background-position: top -3px right -4px;

  .time {
    margin: 0;
    font-size: 11px;
    color: ${styles.brightYellow};
  }

  .mood {
    font-size: 16px;
    margin: 8px 0 15px;
    font-weight: 500;
    text-transform: capitalize;
    color: #0c423b;
  }

  .count {
    color: #fca395;
    font-style: italic;
    font-size: 10px;
    margin-bottom: 10px;
  }
`;
