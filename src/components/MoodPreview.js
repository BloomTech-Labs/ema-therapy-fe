import React from 'react';
import format from 'date-fns/format';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Card from './Card';

const formatDate = (timestamp, fmt) => {
  const ts = Number(timestamp);
  return format(new Date(ts), fmt);
};

function MoodPreview({ lastItem, count }) {
  return (
    <PreviewContainer>
      <p className="weekday">{formatDate(lastItem.createdAt, 'iii')}</p>
      <StyledMoodCard>
        <p className="time">{formatDate(lastItem.createdAt, 'h:mm a')}</p>
        {lastItem.text && <p className="text">{lastItem.text}</p>}
        <p className="count">{count > 1 ? `${count} entries` : '1 entry'}</p>
      </StyledMoodCard>
    </PreviewContainer>
  );
}

MoodPreview.propTypes = {
  lastItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    text: PropTypes.string,
  }).isRequired,
  count: PropTypes.number.isRequired,
};

export default MoodPreview;

const PreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledMoodCard = styled(Card)`
  padding: 25px 23px 10px;
  margin-bottom: 23px;
  width: 90%;
  min-height: 85px;

  .time {
    margin: 0;
    font-size: 14px;
    line-height: 18px;
  }

  .text {
    font-size: 14px;
    margin: 10px 0 20px;
    font-weight: 600;
    max-height: 1.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
