import React from 'react';
import styled from 'styled-components';
import FormViews from '../../components/FormViews';
import backgroundImage from '../../assets/background-leaf.svg';

const EntryForm = () => {
  return (
    <StyledEntryForm>
      <FormViews />
    </StyledEntryForm>
  );
};

const StyledEntryForm = styled.div`
  height: 100%;
  padding: 30px 25px;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-position: top -36px right -20px;
`;

export default EntryForm;
