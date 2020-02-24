import React from 'react';
import Sidenav from '../Sidenav';

const LandingPage = () => {
  return (
    <div className="grid">
      <div className="grid__column--2--md">
        <Sidenav />
      </div>
      <div className="container grid__column">
        <h2>Landing Page</h2>
      </div>
    </div>
  );
};

export default LandingPage;
