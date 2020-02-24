import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import EditItemsPage from '../EditItems';
import Footer from '../Layout/Footer';
import {
  useAuthValue,
  useItemsValue,
  useSelectedItemValue,
} from '../../context/index';

import * as ROUTES from '../../constants/routes';
import Firebase, {
  FirebaseContext,
  useFirebaseValue,
} from '../Firebase';

const App = () => {
  const { items } = useItemsValue();
  const { currentUser, setCurrentUser } = useAuthValue();
  const { selectedItem, setSelectedItem } = useSelectedItemValue();
  const firebase = useFirebaseValue(FirebaseContext);

  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => {
      user ? setCurrentUser(user) : setCurrentUser(null);
    });
  });
  return (
    <Router>
      <div>
        <Navigation authUser={currentUser} />

        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route exact path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.EDIT_ITEMS} component={EditItemsPage} />
      </div>
      <Footer />
    </Router>
  );
};

export default App;
