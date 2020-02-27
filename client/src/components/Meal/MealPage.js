import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import LikeMeal from './LikeMeal';
import { GET_ONE_MEAL } from '../../queries/index';

const MealPage = ({ match }) => {
  const { _id } = match.params;
  console.log(_id);
  const { loading, data, error } = useQuery(GET_ONE_MEAL, {
    variables: { _id },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  console.log(data);
  const {
    title,
    category,
    description,
    allergens,
    ingredients,
    likes,
    instructions,
    amount,
    price,
    location,
    username,
  } = data.getMeal;
  return (
    <div className='App'>
      <h2>{title}</h2>
      <p>Category: {category}</p>
      <p>Description: {description}</p>
      <p>Allergens: {allergens}</p>
      <p>Ingredients: {ingredients}</p>
      <p>Likes: {likes}</p>
      <p>Instructions: {instructions}</p>
      <p>Amount: {amount}</p>
      <p>Price: {price}</p>
      <p>Location: {location}</p>
      <p>Created By: {username}</p>
      <LikeMeal _id={_id} />
    </div>
  );
};

export default withRouter(MealPage);
