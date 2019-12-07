import React from 'react';
import format from 'date-fns/format';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from './Card';
import moodToString from '../utils/moodToString';
import happyPot from '../assets/happy200h.png';
import reallyHappyPot from '../assets/reallyhappy200h.png';
import normalPot from '../assets/normal200h.png';
import sadPot from '../assets/sad200h.png';
import unhappyPot from '../assets/unhappy200h.png';
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
      </DayWrapper>
      <StyledMoodCard lastItem={lastItem}>
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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 23px;

  .weekday {
    color: #0c423b;
    font-size: 12px;
    width: 30px;
    margin: 0 6px 0 0;
  }
`;

const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMoodCard = styled(Card)`
  padding: 7px 16px 8px;
  height: 95px;
  width: 100%;
  background-image: url(${(props) => {
    let path;
    if (props.lastItem.mood === 1) path = unhappyPot;
    if (props.lastItem.mood === 2) path = sadPot;
    if (props.lastItem.mood === 3) path = normalPot;
    if (props.lastItem.mood === 4) path = happyPot;
    if (props.lastItem.mood === 5) path = reallyHappyPot;
    return path;
  }});
  background-repeat: no-repeat;
  background-position: top -18px right -22px;
  background-size: 115px 135px;

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
    text-align: end;
    margin-right: 95px;
  }
`;
