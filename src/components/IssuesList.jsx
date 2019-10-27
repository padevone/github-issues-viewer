import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import IssueItem from './IssueItem';

const IssuesListWrap = styled.ul`
  margin: 0;
  padding: 0;
  border: 1px solid #e1e4e8;
  border-top: 0;
  list-style: none;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
`;

const IssuesListHead = styled.div`
  padding: 16px 8px;
  background-color: #f6f8fa;
  border: 1px solid #e1e4e8;
  border-top-right-radius: 3px;
  border-top-left-radius: 3px;
`;

const IssuesPagination = styled.div`
  margin-top: 8px;
`;

const IssuesList = (props) => {
  const {
    items,
    pagination,
    totalCount,
  } = props;

  return (
    <>
      {items.length > 0 ? (
        <div>
          <IssuesListHead>
            Total count of issues:
            {totalCount}
          </IssuesListHead>

          <IssuesListWrap>
            {items.map((issue) => (
              <IssueItem
                title={issue.title}
                number={issue.number}
                author={issue.user.login}
                key={issue.id}
              />
            ))}
          </IssuesListWrap>

          <IssuesPagination>{pagination}</IssuesPagination>
        </div>
      ) : 'Issues did not find'}
    </>
  );
};

IssuesList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  pagination: PropTypes.element.isRequired,
  totalCount: PropTypes.number,
};

IssuesList.defaultProps = {
  items: [],
  totalCount: 0,
};

export default IssuesList;
