import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom';
import Mainpage from './component/Mainpage';
import Loginpage from './component/Loginpage';
import React from 'react';
import HeaderBar from './component/HeaderBar';
import Footer from './component/Footer';
import Contact from './component/Contact';
import MenuPage from './component/MenuPage';
import Adminpage from './component/Adminpage';

export default class App extends React.Component {
  render(){
    const isLoggedIn = localStorage.getItem('jwt') !== null;

    return (
      <Router>
        <div className="header">
          <div className="container">
            <a href="/" className="navbar-brand scroll-top">Restaurant App</a>
            <nav className="navbar navbar-inverse" role="navigation">
              <div className="navbar-header">
                <button type="button" id="nav-toggle" className="navbar-toggle" data-toggle="collapse" data-target="#main-nav">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
              </div>
              <div id="main-nav" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li><Link to="/">Acasă</Link></li>
                  <li><Link to="/menu">Meniu</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  {isLoggedIn && 
                  <li><Link to="/admin">Admin</Link></li>
                  }
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <Switch>
          <Route path="/admin">
            {isLoggedIn &&
              <>
              <HeaderBar title="Pagină administrativă" body="Esti logat" />
              <Adminpage/>
              </>
            }
            {!isLoggedIn &&
              <Redirect to="/login"/>
            }
          </Route>
          <Route path="/login">
            {isLoggedIn &&
              <Redirect to="/admin"/>
            }
            {!isLoggedIn &&
              <>
              <HeaderBar title="Pagină administrativă" body="Dacă ai drepturi administrative, autentifică-te cu formularul de mai jos!" />
              <Loginpage/>
              </>
            }
            
          </Route>

          <Route path="/menu">
            <HeaderBar title="Meniu" body="Even more vrajeala..." />
            <MenuPage/>
          </Route>

          <Route path="/contact">
            <HeaderBar title="Contact" body="Vrei să ne trimiți un feedback sau să ne contactezi pentru relații de business? Folosește chestionarul de mai jos pentru a lua legătura cu noi!" />
            <Contact/>
          </Route>
  
          <Route path="/" exact={true}>
          <HeaderBar title="Specialități cu gust" body="Te așteptăm la cel mai bun loc unde îți poți răsfăța papilele gustative cu mâncăruri pe alese... și alte vrăjeli..." />
            <Mainpage/>
          </Route>
  
          <Redirect to="/" />
          
        </Switch>

          <Footer/>
      </Router>

      
    );
  }
}
