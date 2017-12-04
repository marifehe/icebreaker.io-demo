'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './components/chat';
import Footer from './components/footer';
import Header from './components/header';

import './styles/styles.scss';

const App = () => {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main className="main">
        <Chat />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};


ReactDOM.render(<App />, document.getElementById('root'));