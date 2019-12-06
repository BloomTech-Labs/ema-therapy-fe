import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import styles from '../styles/theme';
import LeafIcon from '../containers/Dashboard/icons/MoodIcon';
import ChartsIcon from '../containers/Dashboard/icons/ChartsIcon';
import TasksIcon from '../containers/Dashboard/icons/TasksIcon';

function MobileNavBar() {
  return (
    <StyledNavBar>
      <NavButton
        to="/dashboard/moods"
        activeStyle={{ color: styles.tealGreen }}
      >
        <ButtonWrapper>
          <LeafIcon size={32} />
          <span>Mood</span>
        </ButtonWrapper>
      </NavButton>
      <NavButton
        to="/dashboard/charts"
        activeStyle={{ color: styles.rosyPink }}
      >
        <ButtonWrapper>
          <ChartsIcon size={32} />
          <span>Charts</span>
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
          <TasksIcon size={32} />
          <span>Tasks</span>
        </ButtonWrapper>
      </NavButton>
      <NavButton
        to="/dashboard/settings"
        activeStyle={{ color: styles.brightYellow }}
      >
        <ButtonWrapper>
          <FiSettings size={24} />
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
