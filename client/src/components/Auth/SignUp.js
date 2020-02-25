import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SIGNUP_USER } from '../../queries/index';
import { Mutation } from 'react-apollo'; //decided to user render props as the hook looked really messy, will investigate more later
import Error from '../Error';

const initialState = {
  username: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};
class SignUp extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e, createUser) => {
    e.preventDefault();
    const { passwordConfirmation, password } = this.state;
    if (passwordConfirmation !== password) {
      alert('Passwords do not Match!!');
      return;
    }
    createUser()
      .then(async ({ data }) => {
        console.log(data);
        localStorage.setItem('token', data.createUser.token);
        await this.props.refetch();
        this.clearState();
        this.props.history.push('/');
      })
      .catch(error => console.log(error));
  };
  // validateForm = () => {
  //   const { passwordConfirmation, password } = this.state;
  //   const isInvalid = password !== passwordConfirmation;
  //   return isInvalid;

  // };

  render() {
    const { username, passwordConfirmation, password, email } = this.state;
    return (
      <div className='App'>
        <h2 className='App'>Signup</h2>
        <Mutation
          mutation={SIGNUP_USER}
          variables={{ username, email, password }}
        >
          {(createUser, { data, loading, error }) => {
            return (
              <form
                className='form'
                onSubmit={e => this.handleSubmit(e, createUser)}
              >
                <input
                  type='text'
                  name='username'
                  placeholder='Username'
                  onChange={this.handleChange}
                  value={username}
                  required
                />
                <input
                  type='email'
                  name='email'
                  placeholder='Email Address'
                  onChange={this.handleChange}
                  value={email}
                  required
                />
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={this.handleChange}
                  value={password}
                  required
                />
                <input
                  type='password'
                  name='passwordConfirmation'
                  placeholder='Confirm Password'
                  onChange={this.handleChange}
                  value={passwordConfirmation}
                  required
                />
                <button
                  className='button-primary'
                  type='submit'
                  disabled={loading}
                >
                  Submit
                </button>
                {error && <Error error={error} />}
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default withRouter(SignUp);
