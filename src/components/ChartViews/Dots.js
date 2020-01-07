import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Dots = ({ activeGraph }) => {
  return (
    <DotsWrapper>
      <Dot activegraph={activeGraph} active={0} className="dot" />
      <Dot activegraph={activeGraph} active={1} className="dot" />
      <Dot activegraph={activeGraph} active={2} className="dot" />
    </DotsWrapper>
  );
};

Dots.propTypes = {
  activeGraph: PropTypes.number.isRequired,
};

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Dot = styled.div`
  /* border: 1px solid black; */
  border-radius: 50px;
  width: 10px;
  height: 10px;
  margin: 5px;
  background: ${(props) =>
    props.active === props.activegraph ? '#D5EDE9' : '#F5F5F5'};
`;

export default Dots;
