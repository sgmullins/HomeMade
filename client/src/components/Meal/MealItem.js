import React from 'react';
import { Link } from 'react-router-dom';

const MealItem = ({ _id, title, category, imageURL }) => (
  <li
    style={{ background: `url(${imageURL}) center center / cover no-repeat` }}
    className='card'
  >
    <span className={category}>{category}</span>
    <div className='card-text'>
      <Link to={`/meal/${_id}`}>
        <h4>{title}</h4>
      </Link>
    </div>
  </li>
);

export default MealItem;
