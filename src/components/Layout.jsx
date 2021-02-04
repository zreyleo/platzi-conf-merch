import React from 'react';

import Header from './Header';
import Footer from './Footer';

import '../styles/components/Layout.css';

const Layout = ({ children }) => (
  <div className="Main">
    <Header />
    <div className="Main-content container">
      {children}
    </div>
    <Footer />
  </div>
);

export default Layout;
