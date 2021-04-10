import React, {useState, useContext} from 'react';
import LoginForm from './LoginForm';
import Home from '../Home';
import { Container, Button} from '@material-ui/core';
import {db} from '../../api/firebase'
import { toast } from 'react-toastify';
import Context from '../../context/UserContext'

function Login() {

    const [user, setUser] = useState({email: "", pod:""});
    const [error, setError] = useState("");


    const Login = async (details) => {
        const querySnapShot = await db.collection('users').get();
        var cambio = false
        querySnapShot.forEach(doc => {
            if (String(doc.data().email.localeCompare(details.email))=== String(0)){
                if (String(doc.data().password.localeCompare(details.password))=== String(0)){
                    setUser({
                        email: details.email,
                        pod: details.pod
                    });
                    cambio = true;
                    window.sessionStorage.setItem('user', details.email)
                    
                    
                }
                }

        })
        if (!cambio){
            toast("El usuario y/o la contraseña no coinciden", {
                type: "error",
                autoClose: 3000,
            });
        }
        

        
      };

    const Logout = () => {
        setUser({
            email: "",
            pod: ""
        });
        window.sessionStorage.removeItem('user');
    }
    return (
        <Container className="LoginConstants" style={{width: '500px'}}>
            {(user.email !== "") ? ( 
                <div>    
                    <Home/>
                    <Button onClick={Logout}>Cerrar sesión</Button>
                </div>
            ) : (
                <LoginForm Login={Login} error={error}/>
            )}
        </Container>
    );
}

export default Login