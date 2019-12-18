/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import styles from '../styles/theme';

const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5', 'Task 6'];

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
      // console.log(item);
      history.push(`tasks/${item + 1}`);
    }, 5500);
  };

  const selectItem = () => {
    // if (selectedTask === null) {
    const selectedItem = Math.floor(Math.random() * tasks.length);
    onSelectItem(selectedItem);
    setSelectedTask(selectedItem);
    // } else {
    //   setSelectedTask(null);
    //   console.log('null');
    //   setTimeout(selectItem, 500);
    // }
  };

  return (
    <WheelWrapper>
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
                key={item}
                style={{ '--item-nb': index }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </StyledWheel>
    </WheelWrapper>
  );
}

export default Wheel;

const wheelStyles = {
  size: '300px',
  color: styles.darkJungleGreen,
  borderSize: '5px',
  neutralColor: '#ffffff',
  spinningDuration: '4s',
  wheelSliceSpacing: '10px',
};

const PI = 3.14159265358979;

const WheelWrapper = styled.div`
  padding-top: 1rem;
`;

const StyledWheel = styled.div`
  .wheel-container {
    display: block;
    position: relative;
    box-sizing: content-box;
    /* width: calc(var(--wheel-size) + 2 * var(--wheel-border-size));
    height: calc(var(--wheel-size) + 2 * var(--wheel-border-size)); */
    width: calc(${wheelStyles.size} + 2 * ${wheelStyles.borderSize});
    padding: 3px;
    margin: auto;
    /* background-color: var(--neutral-color); */
    background-color: ${wheelStyles.neutralColor};
    /* border: solid var(--wheel-color) 3px; */
    border: solid ${wheelStyles.color} 3px;
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
    /* border-right-color: var(--wheel-color); */
    border-right-color: ${wheelStyles.color};
  }

  .wheel-container::after {
    right: -5px;
    /* border-right-color: var(--neutral-color); */
    border-right-color: ${wheelStyles.neutralColor};
  }

  .wheel {
    display: block;
    position: relative;
    box-sizing: content-box;
    margin: auto;
    /* width: var(--wheel-size);
    height: var(--wheel-size); */
    width: ${wheelStyles.size};
    height: ${wheelStyles.size};
    overflow: hidden;
    border-radius: 50%;
    /* border: solid var(--wheel-color) var(--wheel-border-size); */
    border: solid ${wheelStyles.color} ${wheelStyles.borderSize};
    background-color: var(--wheel-color);
    transition: transform var(--reset-duration);
    transform: rotate(0deg);
    cursor: pointer;
  }

  .wheel.spinning {
    /* transition: transform var(--spinning-duration); */
    transition: transform ${wheelStyles.spinningDuration};
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
    /* background-color: var(--neutral-color); */
    background-color: ${wheelStyles.neutralColor};
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
    color: var(--neutral-color);
    text-align: center;
    padding: 0 25px 0 50px;
    /* font-family: var(--wheel-font); */
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

    --slice-max-width: calc(
      ${PI} * ${wheelStyles.size} + ${wheelStyles.size} / 2
    );

    --slice-width: calc(
      (var(--slice-max-width) / var(--nb-item)) - var(--wheel-slice-spacing)
    );

    border: solid transparent calc(var(--slice-width) / 2);

    border-left: solid transparent 0;

    /* triangle depth = from the center of the wheel to the border = 300px / 2 */
    /* border-right: solid var(--neutral-color) calc(var(--wheel-size) / 2); */
    border-right: solid ${wheelStyles.neutralColor}
      calc(${wheelStyles.size} / 2);
  }
`;
