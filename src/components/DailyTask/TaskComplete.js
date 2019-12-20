import React from 'react';
import styled from 'styled-components';
import Confetti from 'react-confetti';
import styles from '../../styles/theme';
import lady from '../../assets/lady.png';
import Dashboard from '../../containers/Dashboard';

function TaskComplete() {
  return (
    <Dashboard>
      <Confetti
        height={window.innerHeight - 58}
        colors={[
          styles.brightYellow,
          styles.darkJungleGreen,
          styles.paleRobinEggBlue,
          styles.rosyPink,
          styles.seafoamGreen,
          styles.tealGreen,
        ]}
      />
      <Wrapper>
        <h1>Fantastic!</h1>
        <h2>You completed a task</h2>
        <img src={lady} alt="a happy gardener" />
        <h3>You&apos;re on your way to a better day</h3>
      </Wrapper>
    </Dashboard>
  );
}

export default TaskComplete;

const Wrapper = styled.div`
  background: ${styles.seafoamGreen};
  padding: 30px 25px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1,
  h2,
  h3 {
    font-size: 24px;
    color: ${styles.darkJungleGreen};
    font-weight: 500;
    margin: 0;
  }

  h2 {
    margin: 20px 0;
  }

  img {
    margin-top: 70px;
    margin-bottom: 26px;
  }

  h3 {
    font-weight: normal;
    text-align: center;
  }
`;
