import React, { useState } from 'react';
import { Icon, Input } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import NotFound from '../containers/NotFound/404';
import styles from '../styles/theme';

const { TextArea } = Input;

function Task() {
  const { task } = useParams();
  const history = useHistory();
  const [text, setText] = useState();

  const handleChange = (e) => setText(e.target.value);

  if (!(task >= 1 && task <= 7)) return <NotFound />;
  return (
    <TaskWrapper>
      <Header>
        <Icon
          type="left"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => history.goBack()}
        />
        <Title>Daily Task {task}</Title>
      </Header>

      <TextArea
        name="text"
        value={text}
        style={{
          fontSize: 16,
          height: '315px',
          color: '#658883',
          borderRadius: '10',
          padding: '35px 30px',
          background: '#ffffff',
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
          resize: 'none',
        }}
        onChange={handleChange}
        placeholder="Write your thoughts here..."
      />
    </TaskWrapper>
  );
}

export default Task;

const TaskWrapper = styled.div`
  background-color: ${styles.seafoamGreen};
  height: 100%;
  padding: 30px 25px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  color: ${styles.tealGreen};
  font-size: 24px;
  margin: 0;
  margin: 0 20px;
`;
