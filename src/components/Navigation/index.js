import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = ({ authUser }) => {
  console.log('authUser', authUser);
  return (
    <div className="nav-primary">
      {authUser != null ? <NavigationAuth /> : <NavigationNonAuth />}
    </div>
  );
};

const NavigationAuth = () => {
  return (
    <ul className="nav-primary__items">
      <li className="nav-primary__link">
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li className="nav-primary__link">
        <Link to={ROUTES.EDIT_ITEMS}>Edit Item</Link>
      </li>
    </ul>
  );
};

const NavigationNonAuth = () => {
  return (
    <ul className="nav-primary__items">
      <li className="nav-primary__link">
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
    </ul>
  );
};

export default Navigation;
