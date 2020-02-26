import React from 'react';
import { UserInfo } from './UserInfo';
import { UserMeals } from './UserMeals';
import { withAuthHook } from '../Auth/withAuthHook';
const Profile = ({ session }) => (
  <div className='App'>
    <UserInfo session={session} />
    <UserMeals username={session.getCurrentUser.username} />
  </div>
);

export default withAuthHook(session => session && session.getCurrentUser)(
  Profile,
);
