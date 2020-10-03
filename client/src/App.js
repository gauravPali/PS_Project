import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import Authorization from './components/authorization';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <section className="px-5 py-3">
        <div className="row justify-content-center">
          <Route path="/auth" component={Authorization}></Route>
        </div>
      </section>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
