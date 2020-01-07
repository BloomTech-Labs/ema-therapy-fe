/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';
import tasks from './tasks';

function Wheel() {
  const [selectedTask, setSelectedTask] = useState(null);
  const history = useHistory();

  const wheelVars = {
    '--nb-item': tasks.length,
    '--selected-item': selectedTask,
  };
  const spinning = selectedTask !== null ? 'spinning' : '';

  const onSelectItem = (item) => {
    setTimeout(() => {
      history.push(`tasks/${item + 1}`);
    }, 4500);
  };

  const selectItem = () => {
    const selectedItem = Math.floor(Math.random() * tasks.length);
    onSelectItem(selectedItem);
    setSelectedTask(selectedItem);
  };

  return (
    <WheelWrapper>
      <h2>
        Spin the wheel for your
        <br />
        daily task
      </h2>
      <StyledWheel>
        <div className="wheel-container">
          <div
            className={`wheel ${spinning}`}
            style={wheelVars}
            onClick={selectItem}
          >
            {tasks.map((item, index) => (
              <div
                className="wheel-item"
                key={item.taskName}
                style={{ '--item-nb': index }}
              >
                {item.taskName}
              </div>
            ))}
          </div>
        </div>
      </StyledWheel>
    </WheelWrapper>
  );
}

export default Wheel;

const styles = {
  size: '300px',
  color: theme.rosyPink,
  borderSize: '5px',
  neutralColor: '#ffffff',
  spinningDuration: '4s',
  wheelSliceSpacing: '10px',
};

const PI = 3.14159265358979;

const WheelWrapper = styled.div`
  padding: 0 25px;

  h2 {
    text-align: center;
    font-size: 24px;
    color: ${theme.darkJungleGreen};
    margin: 0;
    margin-bottom: 74px;
  }
`;

const StyledWheel = styled.div`
  .wheel-container {
    display: block;
    position: relative;
    box-sizing: content-box;
    width: calc(${styles.size} + 2 * ${styles.borderSize});
    padding: 3px;
    margin: auto;
    background-color: ${styles.neutralColor};
    border: solid ${styles.color} 3px;
    border-radius: 50%;
    user-select: none;
  }

  .wheel-container::before,
  .wheel-container::after {
    content: '';
    display: block;
    position: absolute;
    height: 0;
    width: 0;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    border: solid transparent 20px;
    border-left-width: 0;
  }

  .wheel-container::before {
    right: 0px;
    border-right-color: ${styles.color};
  }

  .wheel-container::after {
    right: -5px;
    border-right-color: ${theme.seafoamGreen};
  }

  .wheel {
    display: block;
    position: relative;
    box-sizing: content-box;
    margin: auto;
    width: ${styles.size};
    height: ${styles.size};
    overflow: hidden;
    border-radius: 50%;
    border: solid ${styles.color} ${styles.borderSize};
    background-color: ${styles.color};
    transition: transform var(--reset-duration);
    transform: rotate(0deg);
    cursor: pointer;
  }

  .wheel.spinning {
    transition: transform ${styles.spinningDuration};
    transform: rotate(
      calc(
        var(--nb-turn) * 360deg +
          (-360deg * var(--selected-item) / var(--nb-item, 1))
      )
    );
  }

  .wheel::after {
    display: block;
    position: absolute;
    content: '';
    background-color: ${styles.neutralColor};
    width: 25px;
    height: 25px;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
  }

  .wheel-item {
    display: block;
    position: absolute;
    box-sizing: border-box;

    top: 50%;
    left: 50%;
    width: 50%;
    transform-origin: center left;
    transform: translateY(-50%)
      rotate(calc(var(--item-nb) * (360deg / var(--nb-item, 1))));
    color: ${styles.neutralColor};
    text-align: center;
    padding: 0 25px 0 50px;
  }

  .wheel-item:before {
    content: ' ';
    display: block;
    position: absolute;
    box-sizing: border-box;
    z-index: -1;
    width: 0;
    height: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding-left: 0px;
    opacity: 0.25;

    --slice-max-width: calc(${PI} * ${styles.size} + ${styles.size} / 2);

    --slice-width: calc(
      (var(--slice-max-width) / var(--nb-item)) - var(--wheel-slice-spacing)
    );

    border: solid transparent calc(var(--slice-width) / 2);
    border-left: solid transparent 0;
    border-right: solid ${styles.neutralColor} calc(${styles.size} / 2);
  }
`;
