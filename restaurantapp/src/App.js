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
import Editpage from "./component/Editpage";
import { LocalReservationsStatus } from './model/LocalReservation';
import Reservations from './service/Reservations';
import ReservationPage from './component/ReservationPage';
import AdminReservationPage from "./component/AdminReservationPage";

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      reservationsStatus: LocalReservationsStatus(Reservations.getLocalReservations())
    };
  }

  componentDidMount(){
    Reservations.listen("app", () => {
      this.setState({reservationsStatus: LocalReservationsStatus(Reservations.getLocalReservations())});
    });
  }

  componentWillUnmount(){
    Reservations.unlisten("app");
  }

  render(){
    const isLoggedIn = localStorage.getItem('jwt') !== null;

    return (
      <Router>
        <div className="header">
          <div className="container">
              <nav className="navbar">
                  <Link to="/" className="navbar-brand">Restaurant App</Link>
              </nav>
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
                  <li><Link to="/">Acas??</Link></li>
                  <li><Link to="/menu">Meniu</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  {isLoggedIn && 
                  <li><Link to="/admin">Admin</Link></li>
                  }
                </ul>
              </div>
            </nav>
            {this.state.reservationsStatus.length > 0 && <>
              <div><Link to="/myres">{this.state.reservationsStatus}</Link></div>
              <br/>
              </>
            }
          </div>
        </div>

        <Switch>
          <Route path="/admin">
            {isLoggedIn &&
              <>
              <HeaderBar title="Pagin?? administrativ??" body="Esti logat" />
              <Adminpage/>
              </>
            }
            {!isLoggedIn &&
              <Redirect to="/login"/>
            }
          </Route>

          <Route path="/reservations">
            {isLoggedIn &&
            <>
              <HeaderBar title="Rezerv??ri" body="Esti logat" />
              <AdminReservationPage/>
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
              <HeaderBar title="Pagin?? administrativ??" body="Dac?? ai drepturi administrative, autentific??-te cu formularul de mai jos!" />
              <Loginpage/>
              </>
            }
            
          </Route>

          <Route path="/menu">
            <HeaderBar title="Meniu"/>
            <MenuPage/>
          </Route>

          <Route path="/edit/:id" render={(props)=>(<>
            <HeaderBar title="Edit" body="Edit"/>
            <Editpage id={props.match.params.id}/>
          </>)}
          />

          <Route path="/contact">
            <HeaderBar title="Contact" body="Vrei s?? ne trimi??i un feedback sau s?? ne contactezi pentru rela??ii de business? Folose??te chestionarul de mai jos pentru a lua leg??tura cu noi!" />
            <Contact/>
          </Route>

          <Route path="/myres">
            <HeaderBar title="Rezerv??ri" body="Aici poti vedea rezerv??rile tale actuale"/>
            <ReservationPage/>
          </Route>
  
          <Route path="/" exact={true}>
          {/* <HeaderBar title="Specialit????i cu gust" body="Te a??tept??m la cel mai bun loc unde ????i po??i r??sf????a papilele gustative cu m??nc??ruri pe alese... ??i alte vr??jeli..." /> */}
            <Mainpage/>
          </Route>
  
          <Redirect to="/" />
          
        </Switch>

          <Footer/>
      </Router>

      
    );
  }
}
