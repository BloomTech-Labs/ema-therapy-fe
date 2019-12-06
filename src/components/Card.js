import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = ({ className, children, backgroundColor }) => {
  return (
    <StyledCard className={className} backgroundColor={backgroundColor}>
      {children}
    </StyledCard>
  );
};

Card.propTypes = {
  backgroundColor: PropTypes.string,
  className: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Card.defaultProps = {
  backgroundColor: '#ffffff',
};

export default Card;

const StyledCard = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  background-color: ${(props) => props.backgroundColor};
`;
