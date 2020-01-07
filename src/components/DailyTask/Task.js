import React, { useState } from 'react';
import { Icon, Input } from 'antd';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useParams, useHistory } from 'react-router-dom';
import request from 'superagent';
import styled from 'styled-components';
import NotFound from '../../containers/NotFound/404';
import styles from '../../styles/theme';
import { useAuth } from '../../utils/dataStore';
import UploadPic from './UploadPic';
import Button from '../Button';
import TaskComplete from './TaskComplete';
import { checkForUserAndGetMoodsQuery } from '../../queries';
import tasks from './tasks';

const { TextArea } = Input;

const ADD_TASK = gql`
  mutation(
    $userEmail: String!
    $prompt: String!
    $text: String
    $photoUrl: String
  ) {
    addTask(
      userEmail: $userEmail
      prompt: $prompt
      text: $text
      photoUrl: $photoUrl
    ) {
      completedAt
      prompt
      text
      photoUrl
    }
  }
`;

function Task() {
  const { user } = useAuth();
  const history = useHistory();
  const { task } = useParams();

  const [text, setText] = useState();
  const [taskComplete, setTaskComplete] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [addTask] = useMutation(ADD_TASK);

  const handleChange = (e) => setText(e.target.value);

  const { taskName, prompt, picturePrompt } = tasks[task - 1];

  const handleSubmit = async () => {
    await addTask({
      variables: {
        userEmail: user.email,
        prompt,
        text,
        photoUrl,
      },
      refetchQueries: [
        {
          query: checkForUserAndGetMoodsQuery,
          variables: { email: user.email },
        },
      ],
      awaitRefetchQueries: true,
    });
    setTaskComplete(true);
  };

  const upload = (file) => {
    const cloudName = 'moodbloom';
    const uploadPreset = process.env.REACT_APP_CLOUDINARY_KEY;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    request
      .post(url)
      .field('upload_preset', uploadPreset)
      .field('file', file)
      .field('multiple', false)
      .on('progress', (progress) => {
        // console.log('progress', progress);
        setIsLoading(true);
      })
      .end((error, response) => {
        // console.log(error, response);
        // set local state to response.body.secure_url for when we submit form to our database
        setPhotoUrl(response.body.secure_url);
        setIsLoading(false);
      });
  };

  if (!(task >= 1 && task <= 7)) return <NotFound />;
  return taskComplete ? (
    <TaskComplete />
  ) : (
    <TaskWrapper>
      <Header>
        <Icon
          type="left"
          style={{ fontSize: 22, color: '#9cd9dd' }}
          onClick={() => history.goBack()}
        />
        <Title>{taskName}</Title>
      </Header>

      <main style={{ marginBottom: '20px' }}>
        <p className="prompt">{prompt}</p>

        <TextArea
          name="text"
          value={text}
          style={{
            fontSize: 12,
            height: '80px',
            color: '#658883',
            borderRadius: '10',
            padding: '15px',
            background: '#ffffff',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
            resize: 'none',
          }}
          onChange={handleChange}
          placeholder="Write your thoughts here..."
        />
      </main>
      <p className="picture-prompt">{picturePrompt}</p>
      <PicturesWrapper>
        <UploadPic upload={upload} />
      </PicturesWrapper>
      <ButtonWrapper>
        <Button onClick={handleSubmit} disabled={isLoading}>
          Done
        </Button>
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
  justify-content: space-between;

  .prompt,
  .picture-prompt {
    color: ${styles.tealGreen};
    font-size: 12px;
  }

  .prompt {
    margin-bottom: 18px;
  }

  .picture-prompt {
    margin-top: 18px;
    margin-bottom: 10px;
    text-align: center;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const Title = styled.h1`
  color: ${styles.darkJungleGreen};
  font-size: 24px;
  margin: 0;
  margin: 0 20px;
`;

const ButtonWrapper = styled.div`
  align-self: center;
`;

const PicturesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
