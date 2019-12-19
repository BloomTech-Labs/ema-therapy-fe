import React, { useState } from 'react';
import { Modal } from 'antd';
import { IoIosShare } from 'react-icons/io';
import styled from 'styled-components';
import useStandalone from '../hooks/useStandalone';
import styles from '../styles/theme';

// Checks if the app was opened from a browser on iOS and if so, provides
// instructions for adding the app to the home screen.  Add to Home Screen only
// works in Safari, so there is also a check to see whether the mobile browser
// used is Safari and if it is not includes an extra sentence of instructions.

function AppleNotification() {
  const isStandalone = useStandalone();
  const showModal = localStorage.getItem('iOSNotification') === null;
  const [isVisible, setIsVisible] = useState(showModal);
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  return !isStandalone && iOS ? (
    <Modal
      visible={isVisible}
      closable={false}
      maskClosable={false} // prevents an outside click from firing onCancel()
      cancelText="Don't show this again"
      onOk={() => setIsVisible(false)}
      onCancel={() => {
        window.localStorage.setItem('iOSNotification', 'false');
        setIsVisible(false);
      }}
    >
      <Title>Add MoodBloom to Home Screen</Title>
      <StyledContent>
        For a better experience using MoodBloom,{' '}
        {!iOSSafari && <strong>open this page in Safari, </strong>} press the
        share button <IoIosShare size={24} /> in the menu bar and select{' '}
        <strong>Add to Home Screen</strong>.
      </StyledContent>
    </Modal>
  ) : null;
}

export default AppleNotification;

const Title = styled.h3`
  color: ${styles.darkJungleGreen};
`;
const StyledContent = styled.p`
  margin: 0;
  padding-top: 10px;
`;
