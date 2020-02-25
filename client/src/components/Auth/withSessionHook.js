import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_CURRENT_USER } from '../../queries/index';

export const withSessionHook = Component => props => {
  const { loading, data, refetch } = useQuery(GET_CURRENT_USER);
  if (loading) return null;
  console.log(data);
  return <Component {...props} refetch={refetch} session={data} />;
};
