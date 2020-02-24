import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
// import { useSelectedItem } from '../../context/index'
import Items from '../Items/';

const Sidenav = () => {
  return (
    <div className="sidebar" data-testid="sidenav">
      <Items />
    </div>
  );
};

export default Sidenav;
