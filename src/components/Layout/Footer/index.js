import React, { useEffect } from 'react';
import { useAuthValue, FirebaseContext } from '../../../context';
import SignOutButton from '../../SignOut';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { FaLinkedinIn, FaGithub, FaCodepen } from 'react-icons/fa';

const Footer = () => {
  const { currentUser, setCurrentUser } = useAuthValue();

  return (
    <div className="footer grid neu-pos padding-sm">
      <div className="grid__column--6">
        <div className="neu-pos padding-sm">
          <h4>About this Project</h4>
          <p>
            The objective of this project is to showcase the tools and
            resources that are part of my workflows. I used this need
            to review the current state of react 2020 and mess around
            with neumorphism in a web design. The stack used is SASS,
            REACT(hooks), and Firebase.
          </p>
          <a href="https://github.com/LucasZapico/firebase-auth-react-hook-study-2020">
            Check out the code for the practice project here
          </a>
        </div>
      </div>
      <div className="grid__column--4"></div>
      <div className="grid__column--2 grid__column--bottom grid--stack">
        <div>
          <FaCodepen className="margin-xxxs" />
          <FaGithub className="margin-xxxs" />

          <FaLinkedinIn className="margin-xxxs" />
        </div>
        <div>
          {currentUser != null ? (
            <SignOutButton />
          ) : (
            <Link className="btn" to={ROUTES.SIGN_IN}>
              Admin
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;

/*
social
social links to config
quick about

*/
