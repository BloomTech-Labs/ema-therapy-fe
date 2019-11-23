import React from 'react';
import { format, getDay } from 'date-fns';
import styled from 'styled-components';
import convertDay from '../utils/convertDay';

const formatDate = (timestamp, fmt) => {
  const ts = Number(timestamp);
  return format(new Date(ts), fmt);
};

function MoodPreview({ lastItem, count }) {
  console.log(lastItem);
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <p className="weekday"> {convertDay(getDay(+lastItem.createdAt))}</p>
      <StyledMoodCard>
        <div className="date-time">
          <p className="time">{formatDate(lastItem.createdAt, 'h:mm a')}</p>
          <p className="date">{count} entries</p>
        </div>
        <div className="mood-details">
          {lastItem.text && <p className="text">{lastItem.text}</p>}
        </div>
      </StyledMoodCard>
    </div>
  );
}

export default MoodPreview;

const StyledMoodCard = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  background-color: #e5e5e5;
  padding: 25px 23px 10px;
  margin-bottom: 23px;

  .date-time {
    display: flex;
    justify-content: space-between;

    .date,
    .time {
      margin: 0;
      font-size: 14px;
      line-height: 18px;
    }
  }

  .mood {
    text-align: center;
    margin: 10px;
    text-transform: capitalize;
    font-size: 16px;
    line-height: 20px;
  }

  .mood-details {
    font-size: 14px;
    line-height: 18px;

    p:not(.text) {
      margin: 0 0 4px;
      padding: 0 15px;
    }

    .text {
      font-weight: 600;
    }
  }
`;
