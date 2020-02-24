import React from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import {
  useFirebaseValue,
  FirebaseContext,
  FirebaseProvider,
} from '../Firebase';

const SignOutButton = () => {
  const firebase = useFirebaseValue(FirebaseContext);
  let history = useHistory();
  const signOut = () => {
    firebase.doSignOut();

    history.push(ROUTES.HOME);
  };
  return (
    <button type="button" onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
