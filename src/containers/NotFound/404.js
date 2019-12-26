import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import Dashboard from '../Dashboard';
import styles from '../../styles/theme';
import plant from '../../assets/plants-svg/plant-unhappy.svg';

function NotFound() {
  const history = useHistory();
  return (
    <Dashboard>
      <Styled404>
        <h1>
          Error
          <br />
          404
        </h1>
        <img src={plant} alt="Unhappy plant fallen over" />
        <button type="button" onClick={() => history.goBack()}>
          <IoIosArrowBack /> Go Back
        </button>
      </Styled404>
    </Dashboard>
  );
}

export default NotFound;

const Styled404 = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    text-align: center;
    font-size: 40px;
    margin: 0 0 20px;
    color: ${styles.tealGreen};
  }

  img {
    transform: rotate(-90deg);
  }

  button {
    display: flex;
    font-size: 18px;
    align-items: center;
    background: transparent;
    border: none;
    margin-top: 20px;
  }
`;
