import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class NavBar extends Component {
    state = {
        session: false
    }

    async componentDidMount(){
        const usuario = window.sessionStorage.getItem('user');
        if(usuario != null){
            this.setState({
                session: true
            })
        }
    }

    render() {
        if(!this.state.session){
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">Inicio</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to="/login" className="nav-link">Iniciar Sesión</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/registrarse" className="nav-link">Registarse</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">Inicio</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">  
                            <li className="nav-item">
                                <Link to="/amigos" className="nav-link" >Amigos</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/peticiones" className="nav-link" >Peticiones</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/perfil" className="nav-link" >Perfil</Link>
                            </li
                            <li className="nav-item">
                                <Link to="/logout" className="nav-link" >Cerrar Sesión</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
    } 
}
