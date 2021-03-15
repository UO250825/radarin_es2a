import React, {Component} from 'react';
import {Container, Button} from '@material-ui/core';
import MapContainer from './MapContainer';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class Aboutscreen extends Component {
  render(){
    return(
      <Container>
        <h1>PÁGINA DE INICIO</h1>

        <Button
          onPress={()=> this.props.navigation.navigate('Login')}
          title="Página principal de la app"
          color=""
        />

        <br></br>
        <br></br>
    <Router>

      
        <Link to='/map'>Mapa</Link>

          <Route path="/map" render={() =>{
            return(
              <div>
                <MapContainer/>
              </div>
            )
          }}>
          </Route>
          
        </Router>

      </Container>



    )
  }
}

export default Aboutscreen;