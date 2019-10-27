import React from 'react';
import styled from 'styled-components';

import { getRepoIssues, ApiError } from '../api';
import RepoSearchForm from './RepoSearchForm';
import IssuesList from './IssuesList';
import Pagination from './Pagination';
import StatusMessage from './StatusMessage';

const Container = styled.div`
  max-width: 1012px;
  margin: 16px auto 16px auto;
`;

// We need to use this wrap
// Because we can't set margin in child component
// This component may use in another place
const IssuesListWrap = styled.div`
  margin-top: 8px;
`;

class Issues extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: '',
      repo: '',
      items: null,
      page: 1,
      perPage: 10,
      totalCount: 0,
      errorMessage: '',
    };

    this.search = this.search.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleHideErrorMessage = this.handleHideErrorMessage.bind(this);
  }

  search() {
    const { owner, repo, page } = this.state;

    getRepoIssues({ owner, repo, page })
      .then(({ items, totalCount }) => {
        this.setState({
          items,
          totalCount,
          errorMessage: '',
        });
      })
      .catch((error) => {
        let errorMessage = 'An Error after getting data';

        if (error instanceof ApiError) {
          if (error.status === 404) {
            errorMessage = 'Issues for this repo not found';
          } else if (error.status === 422) {
            errorMessage = 'The listed users and repositories cannot be searched either because the resources do not exist or you do not have permission to view them.';
          } else if (error.status === 403 && error.remainingLimit === 0) {
            errorMessage = 'API rate limit exceeded';
          }
        }

        this.setState({ errorMessage });
        // eslint-disable-next-line no-console
        console.warn(error.message);
      });
  }

  // TODO: Remove two updating of state -> double rerender of children
  handleSearch({ owner, repo }) {
    this.setState({
      owner,
      repo,
    }, this.search);
  }

  // TODO: Remove two updating of state -> double rerender of children
  handleChangePage(page) {
    this.setState({
      page,
    }, this.search);
  }

  handleHideErrorMessage() {
    this.setState({
      errorMessage: '',
    });
  }

  render() {
    const {
      items,
      totalCount,
      page,
      perPage,
      errorMessage,
    } = this.state;

    const pagination = (
      <Pagination
        page={page}
        perPage={perPage}
        totalCount={totalCount}
        handleChange={this.handleChangePage}
      />
    );

    return (
      <>
        {errorMessage && (
          <StatusMessage handleHide={this.handleHideErrorMessage}>{ errorMessage }</StatusMessage>
        )}


        <Container>
          <RepoSearchForm handleSearch={this.handleSearch} />

          {!errorMessage && items && (
            <IssuesListWrap>
              <IssuesList
                items={items}
                totalCount={totalCount}
                pagination={pagination}
              />
            </IssuesListWrap>
          )}
        </Container>
      </>
    );
  }
}

export default Issues;
