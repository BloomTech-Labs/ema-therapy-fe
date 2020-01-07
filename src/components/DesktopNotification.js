import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import styled from 'styled-components';
// import useStandalone from '../hooks/useStandalone';
import styles from '../styles/theme';

function DesktopNotification() {
  const showModal = localStorage.getItem('DesktopNotification') === null;
  const [isVisible, setIsVisible] = useState();

  useEffect(() => {
    if (window.innerWidth > 500 && showModal) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [showModal]);

  return (
    <Modal
      visible={isVisible}
      closable={false}
      maskClosable={false} // prevents an outside click from firing onCancel()
      cancelText="Don't show this again"
      onOk={() => setIsVisible(false)}
      onCancel={() => {
        window.localStorage.setItem('DesktopNotification', 'false');
        setIsVisible(false);
      }}
    >
      <Title>Try MoodBloom on Mobile</Title>
      <StyledContent>
        This shit is some real hot garbage on a desktop. For a better
        experience, please visit moodbloomapp.com on a mobile phone where you
        will have the option to install the app to your device homescreen.
      </StyledContent>
    </Modal>
  );
}

export default DesktopNotification;

const Title = styled.h3`
  color: ${styles.darkJungleGreen};
`;
const StyledContent = styled.p`
  margin: 0;
  padding-top: 10px;
`;
