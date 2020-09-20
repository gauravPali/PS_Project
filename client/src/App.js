import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome'
import { faUserPlus , faSignInAlt  ,} from '@fortawesome/free-solid-svg-icons'


function App() {
  return (
    <BrowserRouter>
        <header>
          <h1>Ability</h1>
          <nav>
            <Button variant="secondary"><Link to="/">Try Out</Link></Button>
            <Link to="/"> <FA icon={faSignInAlt}/>Login</Link>
          </nav>
        </header>
        <section>
          <h2>Test your knowledge</h2>
          <p>There are various quizzes with different topics.</p>
          <p>Sign up to play mind sport.</p>
          <Button variant="primary">
            <FA icon={faUserPlus}/>Sign Up</Button>
        </section>
        <footer>
          2020 Ability. All rights reserved.
        </footer>
    </BrowserRouter>
  );
}

export default App;
