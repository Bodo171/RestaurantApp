import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect, Link} from 'react-router-dom';
import Mainpage from './component/Mainpage';
import Adminpage from './component/Adminpage';
import React from 'react';
import HeaderBar from './component/HeaderBar';
import Contact from './component/Contact';
import MenuPage from './component/MenuPage';

export default class App extends React.Component {
  render(){
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
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <Switch>
          <Route path="/admin">
            <HeaderBar title="Pagină administrativă" body="Dacă ai drepturi administrative, autentifică-te cu formularul de mai jos!" />
            <Adminpage/>
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

          <footer>
            <div className="container">
              <div className="row">
                  <div className="col-md-4">
                      <p>Copyright &copy; 2017 Victory Template</p>
                  </div>
                  <div className="col-md-4">
                      <ul className="social-icons">
                          <li><a href="/"><i className="fa fa-facebook"></i></a></li>
                          <li><a href="/"><i className="fa fa-twitter"></i></a></li>
                          <li><a href="/"><i className="fa fa-linkedin"></i></a></li>
                          <li><a href="/"><i className="fa fa-rss"></i></a></li>
                          <li><a href="/"><i className="fa fa-dribbble"></i></a></li>
                      </ul>
                  </div>
                  <div className="col-md-4">
                      <p>Designed by <em>templatemo</em></p>
                  </div>
              </div>
          </div>
        </footer>
      </Router>

      
    );
  }
}