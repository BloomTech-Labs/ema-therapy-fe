import React from 'react';
import styled from 'styled-components';
import FormViews from '../../components/FormViews';

const StyledEntryForm = styled.div`
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  border: 2px solid black;
`;

const EntryForm = () => {
  return (
    <StyledEntryForm>
      <FormViews />
    </StyledEntryForm>
  );
};

export default EntryForm;
