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
  .ant-tag-checkable,
  .ant-tag-checkable-checked {
    border-radius: 6px;
    font-weight: 500;
    text-align: center;
    margin: 7px 4px;
    outline: none;
    padding: 3px 4px;
    font-family: Fira Sans;
    font-size: 14px;
  }

  .ant-tag-checkable {
    background: #f3faf9;
    border: 2px solid #c7e7e2;
    color: ${styles.tealGreen};
  }

  .ant-tag-checkable-checked {
    background: #f5f5f5;
    color: #9e9c9c;
    border: 2px solid transparent;
  }
`;
export default ActivityTag;
