import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TicketList from './components/ticket-list.component';
import TicketAdd from './components/ticket-add.component';
import Ticket from './components/ticket.component';
import UserAdd from './components/user-add.component';

function App() {
  return (
    <Router>
      <div>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <a href='/tickets' className='navbar-brand'>Ticket App</a>
          <div className='navbar-nav mr-auto'>
            {/* <li className='nav-item'>
              <Link to={'/tickets'} className='nav-link'>
                Tickets
              </Link>
            </li> */}
            <li className='nav-item'>
              <Link to={'/tickets/add'} className='nav-link'>
                Agregar ticket
              </Link>
            </li>
            <li className='nav-item'>
              <Link to={'/users/add'} className='nav-link'>
                Agregar usuario
              </Link>
            </li>
          </div>
        </nav>
        <div className='container mt-3'>
          <Switch>
            <Route exact path={['/', '/tickets']} component={TicketList} />
            <Route exact path='/tickets/add' component={TicketAdd} />
            <Route exact path='/tickets/:id' component={Ticket} />
            <Route exact path='/users/add' component={UserAdd} />
          </Switch>
        </div>

      </div>
    </Router>
  );
}

export default App;
