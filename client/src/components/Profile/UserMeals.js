import React from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import {
  GET_USER_MEALS,
  DELETE_USER_MEAL,
  GET_ALL_MEALS,
  GET_CURRENT_USER,
} from '../../queries/index';

const handleDelete = deleteUserMeal => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this meal?',
  );
  if (confirmDelete) {
    deleteUserMeal()
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }
};

export const UserMeals = ({ username }) => (
  <Query query={GET_USER_MEALS} variables={{ username }}>
    {({ data, loading, error }) => {
      console.log(data);
      if (loading) return <div>Loading</div>;
      if (error) return <div>Error</div>;
      return (
        <ul>
          <h3>Your Meals</h3>
          {!data.getUserMeals.length && <p>You have not made any meals</p>}
          {data.getUserMeals.map(meal => (
            <li key={meal._id}>
              <Link to={`/meal/${meal._id}`}>
                <p>{meal.title}</p>
              </Link>
              <p style={{ marginBottom: 0 }}>Likes: {meal.likes}</p>
              <Mutation
                mutation={DELETE_USER_MEAL}
                variables={{ _id: meal._id }}
                refetchQueries={() => [
                  { query: GET_ALL_MEALS }, //to refresh data on home page with most current items
                  { query: GET_CURRENT_USER }, //in case we delete a favorite recipe
                ]}
                update={(cache, { data: { deleteUserMeal } }) => {
                  const { getUserMeals } = cache.readQuery({
                    query: GET_USER_MEALS,
                    variables: { username },
                  });

                  cache.writeQuery({
                    query: GET_USER_MEALS,
                    variables: { username },
                    data: {
                      getUserMeals: getUserMeals.filter(
                        meal => meal._id !== deleteUserMeal._id,
                      ),
                    },
                  });
                }}
              >
                {(deleteUserRecipe, attrs = {}) => (
                  <p
                    className='delete-button'
                    onClick={() => handleDelete(deleteUserRecipe)}
                  >
                    {attrs.loading ? 'Deleting Meal ...' : 'X'}
                  </p>
                )}
              </Mutation>
            </li>
          ))}
        </ul>
      );
    }}
  </Query>
);
