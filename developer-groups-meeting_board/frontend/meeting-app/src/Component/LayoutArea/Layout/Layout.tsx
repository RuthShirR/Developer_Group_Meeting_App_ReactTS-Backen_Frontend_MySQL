
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Menu from '../Menu/Menu';
import "./Layout.css";

import Routing from '../Routing/Routing';




function Layout():JSX.Element {
  return (

    <div className='Layout'>
      <header>
        <Header />
      </header>
      <aside>
        <Menu />
      </aside>
      <main>
        <Routing />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  
  );
}

export default Layout;