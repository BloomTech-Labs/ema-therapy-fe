import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Icon = (props) => {
  const { icon } = props;

  return (
    <IconStyle width="30" height="30" viewBox="0 0 500 500">
      <path d={icon} />
    </IconStyle>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

const IconStyle = styled.svg`
  border: 1px solid black;
  border-radius: 100%;
  padding: 4px;
`;

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
