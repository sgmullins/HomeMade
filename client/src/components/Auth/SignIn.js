import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { LOGIN_USER } from '../../queries/index';
import { Mutation } from 'react-apollo'; //decided to user render props as the hook looked really messy, will investigate more later
import Error from '../Error';

const initialState = {
  username: '',
  password: '',
};
class SignIn extends Component {
  state = { ...initialState };

  clearState = () => {
    this.setState({ ...initialState });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e, loginUser) => {
    e.preventDefault();

    loginUser()
      .then(async ({ data }) => {
        console.log(data);
        localStorage.setItem('token', data.loginUser.token);
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
    const { username, password } = this.state;
    return (
      <div className='App'>
        <h2 className='App'>Login</h2>
        <Mutation mutation={LOGIN_USER} variables={{ username, password }}>
          {(loginUser, { data, loading, error }) => {
            return (
              <form
                className='form'
                onSubmit={e => this.handleSubmit(e, loginUser)}
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
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={this.handleChange}
                  value={password}
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

export default withRouter(SignIn);
