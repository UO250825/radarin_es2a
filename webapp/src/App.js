import React from 'react';
import './App.css';
import logo from './logo.svg';
import Welcome from './components/Welcome';
//import LoginConstants from "./components/LoginConstants";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css'
import Registrer from './components/Registrer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/Navigation/Navbar';
import { MapContainer } from './components/MapContainer';
import Friends from './components/Friends/Friends';
import Profile from './components/Profile/Profile';
import {UserContextProvider} from './context/UserContext'
import ReactDOM from 'react-dom';


class App extends React.Component {
  constructor() {
    super()
    this.state = { users: [] }
  }

  refreshUsers(users) {
    this.setState({ users: users })
  }

  render() {
    return (
      <UserContextProvider>
      <div className="App">
        <Router>
          <NavBar/>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Welcome name="Bienvenid@" />
          </header>
          <div className="App-content">
            <Route path='/login' component={Login} /> 
            <Route path="/registrarse" component={Registrer} />
            <Route path="/amigos" component={Friends} />
            <Route path="/map" component={MapContainer} />
	          <Route path="/perfil" component={Profile} />
            <ToastContainer />
          </div>
          
        </Router>
      </div>
      
      </UserContextProvider>


    )
  }
}

export default App;