import React, { useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { LOGIN_USER, GET_CURRENT_USER } from '../../queries/index';
import { useMutation } from '@apollo/react-hooks';
import Error from '../Error';

function SignInHook() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const handleSubmit = (e, loginUser) => {
    e.preventDefault();
    loginUser()
      .then(async ({ data }) => {
        console.log(data);
        localStorage.setItem('token', data.loginUser.token);
        // await this.props.refetch();
        history.push('/');
      })
      .catch(error => console.log(error));
  };

  const [loginUser, { loading, data, error }] = useMutation(LOGIN_USER, {
    variables: { username, password },
  });

  return (
    <div className='App'>
      <h2 className='App'>Login</h2>
      <form className='form' onSubmit={e => handleSubmit(e, loginUser)}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={event => setUsername(event.target.value)}
          value={username}
          required
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={event => setPassword(event.target.value)}
          value={password}
          required
        />

        <button className='button-primary' type='submit' disabled={loading}>
          Submit
        </button>
        {error && <Error error={error} />}
      </form>
    </div>
  );
}

export default withRouter(SignInHook);
