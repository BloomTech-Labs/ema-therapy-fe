import React from 'react';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';

function AddMoodButton() {
  return (
    <AddButton>
      <MdAdd />
    </AddButton>
  );
}

function MobileNav() {
  return (
    <StyledNav>
      <NavButton>Mood</NavButton>
      <NavButton>Stories</NavButton>
      <AddMoodButton />
      <NavButton>Stats</NavButton>
      <NavButton>Settings</NavButton>
    </StyledNav>
  );
}

const StyledNav = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 90px;
  background-color: blue;
  width: 100%;
  position: relative;

  @media (min-width: 510px) {
    display: none;
  }
`;

const NavButton = styled.button`
  background: white;
  height: 30px;
  width: 60px;
`;

const AddButton = styled.button`
  background: white;
  height: 50px;
  width: 50px;
  border: none;
  border-radius: 50%;
  background-color: #bada55;
  font-size: 40px;
  line-height: 40px;
  display: flex;
  top: -25px;
  position: absolute;
`;

export default MobileNav;
