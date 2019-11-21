import React from 'react';
import styled from 'styled-components';

import MobileNavBar from '../../components/MobileNavBar';

function Settings() {
  return (
    <StyledSettings>
      <h1>Settings</h1>
      <MobileNavBar />
    </StyledSettings>
  );
}

const StyledSettings = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export default Settings;
