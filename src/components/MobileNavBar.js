import React from 'react';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';

function MobileNavBar() {
  return (
    <StyledNavBar>
      <NavButton to="/dashboard/moods">Moods</NavButton>
      <NavButton to="/dashboard/stories">Stories</NavButton>
      <AddButton to="/entryform">
        <MdAdd />
      </AddButton>
      <NavButton to="/dashboard/stats">Stats</NavButton>
      <NavButton to="/dashboard/settings">Settings</NavButton>
    </StyledNavBar>
  );
}

const StyledNavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #c4c4c4;
  height: 63px;
  width: 100%;
  position: fixed;
  bottom: 0;
  max-width: 500px;
`;

const NavButton = styled(Link)`
  height: 30px;
  width: 60px;
  font-size: 12px;
  border: 1px solid #000000;
  color: #000;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddButton = styled(Link)`
  background: white;
  height: 40px;
  width: 40px;
  line-height: 40px;
  border: none;
  border-radius: 50%;
  background-color: #6f6c6c;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -20px;
  position: absolute;
  color: #000000;
`;

export default MobileNavBar;
