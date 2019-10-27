import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const IssueItemWrap = styled.li`
  display: flex;
  flex-direction: column;
  padding: 8px;
  
  &:not(:first-child) {
    border-top: 1px solid #e1e4e8;
  }
`;

const IssueItemTitle = styled.span`
  font-weight: 600;
  font-size: 16px;
`;

const IssueItemDescription = styled.span`
  color: #586069;
  font-size: 12px;
`;

const IssueItem = (props) => {
  const {
    title,
    number,
    author,
    createdAt,
  } = props;
  const parsedDate = new Date(createdAt).toLocaleDateString();

  return (
    <IssueItemWrap>
      <IssueItemTitle>{title}</IssueItemTitle>
      <IssueItemDescription>
        #{number} opened by {author} in {parsedDate}
      </IssueItemDescription>
    </IssueItemWrap>
  );
};


IssueItem.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default IssueItem;
