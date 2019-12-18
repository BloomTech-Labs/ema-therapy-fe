import React, { useState } from 'react';
import { Tag } from 'antd';
import styled from 'styled-components';
import styles from '../../styles/theme';

const { CheckableTag } = Tag;

const MyTag = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };

  return (
    <Wrapper>
      <CheckableTag {...props} checked={checked} onChange={handleChange} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .ant-tag-checkable {
    background: #f3faf9;
    border: 1px solid #c7e7e2;
    border-radius: 10px;
    color: ${styles.darkJungleGreen};
  }

  .ant-tag-checkable-checked {
    background: #f5f5f5;
    border-radius: 10px;
    font-size: 14px;
    text-align: center;
    color: #9e9c9c;
    border: 1px solid transparent;
  }
`;

export default MyTag;
