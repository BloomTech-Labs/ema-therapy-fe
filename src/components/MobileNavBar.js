import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import moodIcon from '../assets/mood-icon.svg';
import chartsIcon from '../assets/charts-icon.svg';
import tasksIcon from '../assets/tasks-icon.svg';
import settingsIcon from '../assets/settings-icon.svg';
import styles from '../styles/theme';

function MobileNavBar() {
  return (
    <StyledNavBar>
      <NavButton
        to="/dashboard/moods"
        activeStyle={{ color: styles.tealGreen }}
      >
        <ButtonWrapper>
          <img src={moodIcon} alt="leaf" />
          Mood
        </ButtonWrapper>
      </NavButton>
      <NavButton
        to="/dashboard/charts"
        activeStyle={{ color: styles.rosyPink }}
      >
        <ButtonWrapper>
          <img src={chartsIcon} alt="chart" />
          Charts
        </ButtonWrapper>
      </NavButton>
      <AddButton to="/entryform">
        <Icon type="plus" style={{ fontSize: '22px' }} />
      </AddButton>
      <NavButton
        to="/dashboard/tasks"
        activeStyle={{ color: styles.darkJungleGreen }}
      >
        <ButtonWrapper>
          <img src={tasksIcon} alt="tasks" />
          Tasks
        </ButtonWrapper>
      </NavButton>
      <NavButton
        to="/dashboard/settings"
        activeStyle={{ color: styles.brightYellow }}
      >
        <ButtonWrapper>
          <img src={settingsIcon} alt="settings" />
          Settings
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
  border-radius: 14px;
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

const AddButton = styled(NavLink)`
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
