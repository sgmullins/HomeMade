import React from 'react';
// import { withRouter } from 'react-router-dom'; dont think we need this since I changed the route to render the component directly
//thus givng us access to the id from history
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
    imageURL,
  } = data.getMeal;
  return (
    <div className='App'>
      <div
        style={{
          background: `url(${imageURL}) center center /cover no-repeat`,
        }}
        className='meal-image'
      ></div>
      <div className='meal'>
        <div className='meal-header'>
          <h2 className='meal-title'>
            <strong>{title}</strong>
          </h2>
          <h5>
            <strong>{category}</strong>
          </h5>
          <p>
            Made by <strong>{username}</strong>
          </p>
          <p>
            {likes}{' '}
            <span role='img' aria-label='on fire'>
              🔥
            </span>
          </p>
        </div>
        <h3 className='meal-instructions__title'>Description</h3>
        <blockquote className='meal-description'>{description}</blockquote>
        <h3 className='meal-instructions__title'>Instructions</h3>
        <blockquote className='meal-description'>{instructions}</blockquote>
        <h3 className='meal-instructions__title'>Ingredients</h3>
        <blockquote className='meal-description'>{ingredients}</blockquote>
        <h3 className='meal-instructions__title'>Allergens</h3>
        <blockquote className='meal-description'>{allergens}</blockquote>
        <div className='monies'>
          <h3>Cost: ${price}</h3>
          <h3>Amount Available: {amount}</h3>
        </div>
        <h3 className='meal-instructions__title'>{location}</h3>

        <LikeMeal _id={_id} />
      </div>
    </div>
  );
};

export default MealPage;
