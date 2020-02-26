import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { GET_USER_MEALS } from '../../queries/index';

export const UserMeals = ({ username }) => (
  <Query query={GET_USER_MEALS} variables={{ username }}>
    {({ data, loading, error }) => {
      console.log(data);
      if (loading) return <div>Loading</div>;
      if (error) return <div>Error</div>;
      return (
        <ul>
          <h3>Your Meals</h3>
          {data.getUserMeals.map(meal => (
            <li key={meal._id}>
              <Link to={`/meal/${meal._id}`}>
                <p>{meal.title}</p>
              </Link>
              <p>Likes: {meal.likes}</p>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);
