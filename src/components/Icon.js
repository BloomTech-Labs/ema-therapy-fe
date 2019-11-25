import React from 'react';
import styled from 'styled-components';

const Icon = (props) => {
  const { icon } = props;

  return (
    <IconStyle width="30" height="30" viewBox="0 0 500 500">
      <path d={icon} />
    </IconStyle>
  );
};

const IconStyle = styled.svg`
  border: 1px solid black;
  border-radius: 100%;
  padding: 4px;
`;

export default Icon;
