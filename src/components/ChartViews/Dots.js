import React from 'react';
import styled from 'styled-components';

const Dots = ({ activeGraph }) => {
  console.log(activeGraph);
  return (
    <DotsWrapper>
      <Dot activegraph={activeGraph} active="0" className="dot" />
      <Dot activegraph={activeGraph} active={1} className="dot" />
      <Dot activegraph={activeGraph} active={2} className="dot" />
    </DotsWrapper>
  );
};

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Dot = styled.div`
  border: 1px solid black;
  border-radius: 50px;
  width: 10px;
  height: 10px;
  margin: 5px;
  background: ${(props) =>
    props.active === props.activeGraph ? 'darkred' : 'limegreen'};
`;

export default Dots;
