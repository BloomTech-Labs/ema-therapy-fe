import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import styles from '../styles/theme';
import {
  MoodIcon,
  ChartsIcon,
  TasksIcon,
  SettingsIcon,
  PlusIcon,
} from '../containers/Dashboard/icons';

function MobileNavBar() {
  return (
    <StyledNavBar>
      <NavButton
        exact
        to="/dashboard"
        activeStyle={{ color: styles.tealGreen }}
      >
        <ButtonWrapper>
          <MoodIcon size={28} />
          <span>Mood</span>
        </ButtonWrapper>
      </NavButton>
      <NavButton
        to="/dashboard/charts"
        activeStyle={{ color: styles.rosyPink }}
      >
        <ButtonWrapper>
          <ChartsIcon size={28} />
          <span>Charts</span>
        </ButtonWrapper>
      </NavButton>
      <AddButton to="/entryform">
        <PlusIcon size={20} />
      </AddButton>
      <NavButton
        to="/dashboard/tasks"
        activeStyle={{ color: styles.darkJungleGreen }}
      >
        <ButtonWrapper>
          <TasksIcon size={28} />
          <span>Tasks</span>
        </ButtonWrapper>
      </NavButton>
      <NavButton
        to="/dashboard/settings"
        activeStyle={{ color: styles.brightYellow }}
      >
        <ButtonWrapper>
          <SettingsIcon size={28} />
          <span>Settings</span>
        </ButtonWrapper>
      </NavButton>
    </StyledNavBar>
  );
}

const StyledNavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  height: 58px;
  width: 100%;
  position: fixed;
  bottom: 0;
  max-width: 500px;
  border-radius: 14px 14px 0px 0px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavButton = styled(NavLink)`
  height: 30px;
  width: 60px;
  font-size: 12px;
  color: #000;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AddButton = styled(Link)`
  background: white;
  height: 50px;
  width: 50px;
  border: none;
  border-radius: 50%;
  background-color: #00917a;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -13px;
  position: relative;
  color: #ffffff;
  /* box-shadow: 0px 0px 8px 2px #00917A; */
`;

export default MobileNavBar;
