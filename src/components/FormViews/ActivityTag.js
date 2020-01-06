/* eslint-disable no-shadow */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import styled from 'styled-components';
import styles from '../../styles/theme';

const { CheckableTag } = Tag;

const ActivityTag = ({
  isSelectedForEdit,
  addActivities,
  activityType,
  ...rest
}) => {
  const [checked, setChecked] = useState(isSelectedForEdit);

  const handleChange = (checked, activityType) => {
    setChecked(!checked);
    addActivities(activityType);
  };

  return (
    <Wrapper>
      <CheckableTag
        {...rest}
        checked={checked}
        onChange={() => handleChange(checked, activityType)}
      />
    </Wrapper>
  );
};

ActivityTag.propTypes = {
  addActivities: PropTypes.func.isRequired,
  activityType: PropTypes.string.isRequired,
  isSelectedForEdit: PropTypes.bool.isRequired,
};
const Wrapper = styled.div`
  .ant-tag-checkable {
    background: #f3faf9;
    border: 1px solid #c7e7e2;
    border-radius: 10px;
    color: ${styles.darkJungleGreen};
    margin-bottom: 7px;
  }

  .ant-tag-checkable-checked {
    background: #f5f5f5;
    border-radius: 10px;
    font-size: 14px;
    text-align: center;
    color: #9e9c9c;
    border: 1px solid transparent;
    margin-bottom: 7px;
  }
`;
export default ActivityTag;
