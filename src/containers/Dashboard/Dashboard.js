import React from 'react';
import MoodPreview from '../../components/MoodPreview';
import NavBuffet from '../../components/NavBuffet';
import Logo from '../../components/Logo';

const Dashboard = () => {
  return (
    <div>
      <Logo />
      hello this is dashbaord
      <MoodPreview />
      <NavBuffet />
    </div>
  );
};

export default Dashboard;
