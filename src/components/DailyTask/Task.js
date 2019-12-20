import React, { useState } from 'react';
import { Icon, Input } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import NotFound from '../../containers/NotFound/404';
import styles from '../../styles/theme';
import UploadPic from './UploadPic';
import Button from '../Button';
import TaskComplete from './TaskComplete';

const { TextArea } = Input;

function Task() {
  const { task } = useParams();
  const history = useHistory();
  const [text, setText] = useState();
  const [taskComplete, setTaskComplete] = useState(false);
  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = () => {
    console.log(text);
    setTaskComplete(true);
  };

  if (!(task >= 1 && task <= 7)) return <NotFound />;
  return taskComplete ? (
    <TaskWrapper>
      <TaskComplete />
    </TaskWrapper>
  ) : (
    <TaskWrapper>
      <Header>
        <Icon
          type="left"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => history.goBack()}
        />
        <Title>Daily Task {task}</Title>
      </Header>

      <main>
        <StyledPrompt>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          hendrerit condimentum nisi, at convallis sapien pellentesque quis.
        </StyledPrompt>

        <TextArea
          name="text"
          value={text}
          style={{
            fontSize: 16,
            height: '200px',
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
      </main>
      <PicturesWrapper>
        <UploadPic />
      </PicturesWrapper>
      <ButtonWrapper>
        <Button onClick={handleSubmit}>Done</Button>
      </ButtonWrapper>
    </TaskWrapper>
  );
}

export default Task;

const TaskWrapper = styled.div`
  background-color: ${styles.seafoamGreen};
  height: 100%;
  padding: 30px 25px;
  display: flex;
  flex-direction: column;
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

const StyledPrompt = styled.p`
  color: ${styles.tealGreen};
  margin-bottom: 24px;
`;

const ButtonWrapper = styled.div`
  align-self: center;
`;

const PicturesWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 2px solid green;
  display: flex;
  align-items: center; */
`;
