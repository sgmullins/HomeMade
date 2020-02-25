import React from 'react';
import { GET_CURRENT_USER } from '../../queries/index';
import { Query } from 'react-apollo';

export const withSession = Component => props => (
  <Query query={GET_CURRENT_USER}>
    {({ data, loading, refetch }) => {
      /* refetch is a property given to use by graphql. To use this we had to change our redirecting components
        to wrapped components with 'withRouter' and then render them in index.js with render */
      if (loading) return null;
      console.log(data);
      return <Component {...props} refetch={refetch} />;
    }}
  </Query>
);
