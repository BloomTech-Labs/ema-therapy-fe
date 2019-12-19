import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { IoIosShare } from 'react-icons/io';
import useStandalone from '../hooks/useStandalone';
import theme from '../styles/theme';

function AppleNotification() {
  const isStandalone = useStandalone();

  const showModal = () => {
    let showIosNotification;
    if (window.localStorage.getItem('showIosNotification') !== null) {
      showIosNotification = false;
    } else {
      showIosNotification = true;
    }
    return showIosNotification;
  };

  const [isModalOpen, setIsModalOpen] = useState(showModal);

  const ua = window.navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);

  return !isStandalone && iOS ? (
    <Modal
      visible={isModalOpen}
      closable={false}
      cancelText="Don't show this again"
      onOk={() => setIsModalOpen(false)}
      onCancel={() => {
        window.localStorage.setItem('showIosNotification', false);
        setIsModalOpen(false);
      }}
    >
      <h3 style={{ color: theme.darkJungleGreen }}>
        Add MoodBloom to Home Screen
      </h3>
      <p>
        For a better experience,{' '}
        {!iOSSafari && (
          <>
            <strong>open this page in Safari,</strong>{' '}
          </>
        )}{' '}
        press the share button <IoIosShare size={24} /> and choose{' '}
        <strong>Add to Home Screen</strong>.
      </p>
    </Modal>
  ) : null;
}

export default AppleNotification;
