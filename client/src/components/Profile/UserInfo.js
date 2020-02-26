import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = date => {
  const newDate = new Date(+date).toLocaleDateString('en-US');
  const newTime = new Date(+date).toLocaleTimeString('en-US');
  return `${newDate} at ${newTime}`;
};

export const UserInfo = ({ session }) => {
  const {
    joinDate,
    username,
    favorites,
    purchases,
    email,
  } = session.getCurrentUser;

  return (
    <div>
      <h3>User Info</h3>
      <p>UserName: {username}</p>
      <p>Email: {email}</p>
      <p>JoinDate: {formatDate(joinDate)}</p>
      <ul>
        <h3>Your Favorites</h3>
        {favorites.map(favorite => (
          <li key={favorite._id}>
            <Link to={`/meal/${favorite._id}`}>
              <p>{favorite.title}</p>
            </Link>
          </li>
        ))}
        {!favorites.length && <p>No Favorites to show</p>}
      </ul>
      <ul>
        <h3>Previous Purchases</h3>
        {purchases.map(purchase => (
          <li key={purchase._id}>
            <Link to={`/meal/${purchase._id}`}>
              <p>{purchase.title}</p>
            </Link>
          </li>
        ))}
        {!purchases.length && <p>No purchases to show</p>}
      </ul>
    </div>
  );
};
