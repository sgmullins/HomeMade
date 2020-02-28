import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';
import { GET_CURRENT_USER } from '../../queries/index';

export const withAuthHook = conditionFunc => Component => props => {
  const { loading, data, error } = useQuery(GET_CURRENT_USER);
  if (loading) return null;
  if (error) {
    console.log(`Error from withAuth ${error}`);
  }
  return conditionFunc(data) ? <Component {...props} /> : <Redirect to='/' />;
};
