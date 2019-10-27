import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// If you will use same components in other places -
// You need to create common UI components like this
// It's a reason why I keep UI components here
const FormInput = styled.input`
  min-width: 250px;
  min-height: 34px;
  padding: 6px 8px;
  background-color: #fafbfc;
  border: 1px solid #d1d5da;
  border-radius: 3px;

  &:focus {
    background-color: #fff;
  }
`;

const FormButton = styled.button`
  padding: 6px 12px;
  color: #fff;
  background-color: #28a745;
  background-image: linear-gradient(-180deg,#34d058,#28a745 90%);
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  border: 1px solid rgba(27,31,35,.2);
  border-radius: .25em;

  &:hover,
  &:focus {
    background-color: #269f42;
    background-image: linear-gradient(-180deg,#2fcb53,#269f42 90%);
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:not(:first-child) {
    margin-top: 8px;
  }
`;

const FormControls = styled.div`
  margin-top: 8px;
`;

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: '',
      repo: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleSubmitForm(event) {
    const { owner, repo } = this.state;
    const { handleSearch } = this.props;

    event.preventDefault();

    handleSearch({
      owner,
      repo,
    });
  }

  handleInput({ target }) {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { owner, repo } = this.state;

    const ownerControlId = 'owner';
    const repoControlId = 'repo';

    return (
      <form onSubmit={this.handleSubmitForm}>
        <FormField>
          <label htmlFor={ownerControlId}>Owner</label>
          <FormInput
            type="text"
            id={ownerControlId}
            name={ownerControlId}
            value={owner}
            onChange={this.handleInput}
            required
          />
        </FormField>

        <FormField>
          <label htmlFor={repoControlId}>Repo</label>
          <FormInput
            type="text"
            id={repoControlId}
            name={repoControlId}
            value={repo}
            onChange={this.handleInput}
            required
          />
        </FormField>

        <FormControls>
          <FormButton type="submit">Search</FormButton>
        </FormControls>
      </form>
    );
  }
}

Form.propTypes = {
  handleSearch: PropTypes.func,
};

Form.defaultProps = {
  handleSearch: () => {},
};

export default Form;
