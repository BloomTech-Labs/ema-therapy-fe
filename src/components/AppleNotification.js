import React, { useState } from 'react';
import { Modal } from 'antd';
import { IoIosShare } from 'react-icons/io';
import styled from 'styled-components';
import useStandalone from '../hooks/useStandalone';
import styles from '../styles/theme';

const showModal = () => {
  let showIosNotification;
  if (window.localStorage.getItem('showIosNotification') !== null) {
    showIosNotification = false;
  } else {
    showIosNotification = true;
  }
  return showIosNotification;
};

function AppleNotification() {
  const isStandalone = useStandalone();
  const [isModalOpen, setIsModalOpen] = useState(showModal);
  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  return !isStandalone && iOS ? (
    <Modal
      visible={isModalOpen}
      closable={false}
      // if masClosable is true then a click outside of the modal will fire
      // onCancel() which will set showIosNotification to false
      maskClosable={false}
      cancelText="Don't show this again"
      onOk={() => setIsModalOpen(false)}
      onCancel={() => {
        window.localStorage.setItem('showIosNotification', false);
        setIsModalOpen(false);
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
