import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { AiOutlineFrown } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import Dashboard from '../Dashboard';

function NotFound() {
  const history = useHistory();
  return (
    <Dashboard>
      <Styled404>
        <h1>Sorry Not Sorry</h1>
        <AiOutlineFrown size={200} />
        <button type="button" onClick={() => history.goBack()}>
          <IoIosArrowBack /> Go Back
        </button>
      </Styled404>
    </Dashboard>
  );
}

export default NotFound;

const Styled404 = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    text-align: center;
    font-size: 40px;
    margin: 0 0 20px;
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
