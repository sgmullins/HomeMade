import React from 'react';
import { Link } from 'react-router-dom';

export const SearchResultItem = meal => (
  <li>
    <Link to={`/meal/${meal._id}`}>
      <h4>{meal.title}</h4>
    </Link>
    <p>Likes: {meal.likes}</p>
  </li>
);
