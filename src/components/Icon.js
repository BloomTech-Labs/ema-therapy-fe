import React from 'react';

const Icon = (props) => {
  const { icon } = props;

  return (
    <svg width="30" height="30" viewBox="0 0 1024 1024">
      <path d={icon} />
    </svg>
  );
};

export default Icon;
