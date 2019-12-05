import React from 'react';
import styled from 'styled-components';
import FormViews from '../../components/FormViews';

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
`;

export default EntryForm;
