import React from 'react';
import { Link } from 'react-router-dom';

const MealItem = ({ _id, title, category }) => (
  <li>
    <Link to={`/meal/${_id}`}>
      <h4>{title}</h4>
    </Link>
    <p>
      <strong>{category}</strong>
    </p>
  </li>
);

export default MealItem;
