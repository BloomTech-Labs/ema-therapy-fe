import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import checkIcon from '../utils/CheckIcon';

const AntIcon = (props) => {
  const { icon } = props;

  const checkedIcon = checkIcon(icon);

  return (
    <IconStyle>
      <Icon type={checkedIcon} />
    </IconStyle>
  );
};

const IconStyle = styled.div`
  padding: 10px;
`;

AntIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default AntIcon;
