import React from 'react';

const MealItem = ({ _id, title, category }) => (
  <li>
    <h4>{title}</h4>
    <p>
      <strong>{category}</strong>
    </p>
  </li>
);

export default MealItem;
