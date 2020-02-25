import React from 'react';
import { NavLink } from 'react-router-dom';
import SignOut from '../Auth/SignOut';

export const NavBar = ({ session }) => (
  <nav>
    {session && session.getCurrentUser ? (
      <NavBarAuth session={session} />
    ) : (
      <NavBarUnAuth />
    )}
  </nav>
);

const NavBarAuth = ({ session }) => (
  <>
    <ul>
      <li>
        <NavLink to='/' exact>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to='/search'>Search</NavLink>
      </li>
      <li>
        <NavLink to='/meal/add'>Add a Meal</NavLink>
      </li>
      <li>
        <NavLink to='/profile'>Profile</NavLink>
      </li>
      <li>
        <SignOut />
      </li>
    </ul>
    <h4>
      Welcome, <strong>{session.getCurrentUser.username}</strong>
    </h4>
  </>
);

const NavBarUnAuth = () => (
  <ul>
    <li>
      <NavLink to='/' exact>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to='/search' exact>
        Search
      </NavLink>
    </li>

    <li>
      <NavLink to='/signin' exact>
        SignIn
      </NavLink>
    </li>
    <li>
      <NavLink to='/signup' exact>
        SignUp
      </NavLink>
    </li>
  </ul>
);
