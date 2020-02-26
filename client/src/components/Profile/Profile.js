import React from 'react';
import { UserInfo } from './UserInfo';

export const Profile = ({ session }) => (
  <div className='App'>
    <UserInfo session={session} />
  </div>
);
