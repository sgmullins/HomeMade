import React, { useState } from 'react';

import { SIGNUP_USER } from '../../queries/index';
import { useMutation } from '@apollo/react-hooks';
import Error from '../Error';

export default function SignUpHook() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = (e, createUser) => {
    e.preventDefault();
    createUser().then(data => {
      console.log(data);
    });
  };

  const [createUser, { loading, data, error }] = useMutation(SIGNUP_USER, {
    variables: { username, email, password },
  });

  return (
    <div className='App'>
      <h2 className='App'>Signup</h2>
      <form className='form' onSubmit={e => handleSubmit(e, createUser)}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          onChange={event => setUsername(event.target.value)}
          value={username}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email Address'
          onChange={event => setEmail(event.target.value)}
          value={email}
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
        <input
          type='password'
          name='passwordConfirmation'
          placeholder='Confirm Password'
          onChange={event => setPasswordConfirmation(event.target.value)}
          value={passwordConfirmation}
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
