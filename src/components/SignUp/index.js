import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import { useFirebaseValue, FirebaseContext } from '../Firebase';

const SignUpPage = () => {
  return (
    <div>
      <h2>Sign Up Page</h2>
      <SignUpForm />
    </div>
  );
};

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const SignUpForm = () => {
  // const { firebase } = useFirebaseValue;
  const firebase = useFirebaseValue(FirebaseContext);
  let history = useHistory();
  const [user, setNewUser] = useState(INITIAL_STATE);

  // test

  const onSubmit = event => {
    event.preventDefault();
    console.log(user);
    firebase
      .doCreateUserWithEmailAndPassword(user.email, user.passwordOne)
      .then(authUser => {
        console.log(authUser);
        setNewUser(INITIAL_STATE);
        history.push(ROUTES.HOME);
      })
      .catch(error => {
        setNewUser({ error: error });
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log('errorcode', errorCode);
        console.log('errorMessage', errorMessage);
      });
  };
  const onChange = event => {};

  const isInvalid =
    user.passwordOne !== user.passwordTwo ||
    user.passwordOne === '' ||
    user.email === '' ||
    user.username === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={user.username}
        onChange={e =>
          setNewUser({ ...user, username: e.target.value })
        }
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={user.email}
        onChange={e => setNewUser({ ...user, email: e.target.value })}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={user.passwordOne}
        onChange={e =>
          setNewUser({ ...user, passwordOne: e.target.value })
        }
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={user.passwordTwo}
        onChange={e =>
          setNewUser({ ...user, passwordTwo: e.target.value })
        }
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
      {user.error && <p>{user.error.message}</p>}
    </form>
  );
};

const SignUpLink = () => {
  return (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
};

export default SignUpPage;

export { SignUpForm, SignUpLink };
