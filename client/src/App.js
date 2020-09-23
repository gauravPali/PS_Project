import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Authorization from './components/authorization';
import Cards from './components/categoryCard';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <section className="px-5 py-2">
        <div className="row">
          {/* <Authorization /> */}
          <Cards/>
          {/* <Route path="/categories" component={Cards}></Route> */}
        </div>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
