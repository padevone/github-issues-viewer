import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PaginationControl = styled.button`
  padding: 7px 12px;
  color: ${({ disabled }) => (disabled ? '#d1d5da' : '#0366d6')};
  background-color: ${({ disabled }) => (disabled ? '#fafbfc' : 'transparent')};
  font-weight: 600;
  font-size: 13px;
  border: 1px solid #e1e4e8;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  &:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  &:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  &:hover {
    background-color: ${({ disabled }) => !disabled && '#eff3f6'};
  }
`;

const PaginationPosition = styled.span`
  padding: 7px 12px;
  font-size: 13px;
  border: 1px solid #e1e4e8;
  border-left: 0;
  border-right: 0;
`;

const Pagination = (props) => {
  const {
    page,
    totalCount,
    perPage,
    handleChange,
  } = props;

  const countPages = Math.ceil(totalCount / perPage);

  return (
    <div>
      <PaginationControl
        disabled={page <= 1}
        type="button"
        onClick={() => handleChange(page - 1)}
      >
        Prev
      </PaginationControl>

      <PaginationPosition>Page {page} of {countPages}</PaginationPosition>

      <PaginationControl
        disabled={page >= countPages}
        type="button"
        onClick={() => handleChange(page + 1)}
      >
        Next
      </PaginationControl>
    </div>
  );
};

Pagination.propTypes = {
  page: PropTypes.number,
  totalCount: PropTypes.number,
  perPage: PropTypes.number,
  handleChange: PropTypes.func,
};

Pagination.defaultProps = {
  page: 1,
  totalCount: 0,
  perPage: 10,
  handleChange: () => {},
};

export default Pagination;
