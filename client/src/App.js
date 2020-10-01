import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Authorization from './components/authorization';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <section className="px-5 py-5">
        <div className="row justify-content-center">
          <Authorization />
        </div>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
