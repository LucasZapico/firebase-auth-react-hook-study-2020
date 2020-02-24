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
            I created this project is because I am a gear/tool
            head...That means that I am continously looking and
            weighing new tools, methods, integrations to sweeten my
            own workflow. The result of this is that in conversion
            people often ask me what one tool, extension, plugin,
            package or app I am using for x,y or z.
          </p>
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
