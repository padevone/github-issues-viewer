import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StatusMessageWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
  color: #032f62;
  background-color: #dbedff;
  border: 1px solid #1b1f2326;
`;

const StatusMessageHideControl = styled.button`
  background-color: transparent;
  border: 0;
  opacity: 0.6;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

const StatusMessage = ({ children, handleHide }) => (
  <StatusMessageWrap>
    {children}
    <StatusMessageHideControl type="button" onClick={handleHide}>Hide</StatusMessageHideControl>
  </StatusMessageWrap>
);

StatusMessage.propTypes = {
  children: PropTypes.node.isRequired,
  handleHide: PropTypes.func.isRequired,
};

export default StatusMessage;
