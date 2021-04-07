import React, { useState, useEffect } from "react";
import { List, Value, Name, Link } from "@solid/react";
import "./Friends.css";
import "bootstrap/dist/css/bootstrap.css";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import DocumentTitle from "react-document-title";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../api/firebase'



function Friends() {

  const { default: data } = require("@solid/query-ldflex");

  const usuarioActivo = window.sessionStorage.getItem('user');

  const [details, setDetails] = useState({ emisor: window.sessionStorage.getItem('user'), receptor: "" });

  const [amigos, setAmigos] = useState([]);




  const getAmigos = async () => {
    db.collection("amigos").onSnapshot((querySnapShot) => {
      const docs = [];
      querySnapShot.forEach(doc => {
        if (String(doc.data().usuario1.localeCompare(usuarioActivo)) === String(0)) {
          docs.push({ nombre: doc.data().usuario2, id: doc.id })
        }
        if ((String(doc.data().usuario2.localeCompare(usuarioActivo)) === String(0))) {
          docs.push({ nombre: doc.data().usuario1, id: doc.id })
        }
      });
      setAmigos(docs);
    });
  };

  const addFriend = async (idAmigo) => {
    if (idAmigo.localeCompare(window.sessionStorage.getItem('user')) !== 0) {
      if (idAmigo.localeCompare("") !== 0) {
        if (await existeUsuario(idAmigo)) {
          if (await existeAmigo(idAmigo)) {
            toast.error("Ya sois amig@s", {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 2500
            });
          } else {
            if (await existePeticion(idAmigo)) {
              toast.error("Ya habías enviado esta petición", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2500
              });
            }
            else {
              await db.collection('peticiones').doc().set(details);
              toast.info("Has enviado la petición de amistad correctamente", {
                position: toast.POSITION.BOTTOM_LEFT,
                autoClose: 2500
              });
              await sleep(2500);
            }
          }
        }
        else {
          toast.error("No existe el usuario indicado", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2500
          });
        }
      } else {
        toast.error("Cadena vacía", {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 2500
        });
      }
    }
    else {
      toast.error("No puedes agregarte a ti mism@", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2500
      });
    }
  };

  const existeAmigo = async (idAmigo) => {
    const querySnapShot = await db.collection('amigos').get();
    var existeAmigo = false;
    querySnapShot.forEach(doc => {
      if (String(doc.data().usuario1.localeCompare(details.emisor)) === String(0) && (String(doc.data().usuario2.localeCompare(idAmigo)) === String(0))) {
        existeAmigo = true;
      }
      if (String(doc.data().usuario2.localeCompare(details.emisor)) === String(0) && (String(doc.data().usuario1.localeCompare(idAmigo)) === String(0))) {
        existeAmigo = true;
      }
    })
    if (existeAmigo) {
      return true;
    }
    else {
      return false;
    }
  };

  const existePeticion = async (idAmigo) => {
    const querySnapShot = await db.collection('peticiones').get();
    var existePeticion = false;
    querySnapShot.forEach(doc => {
      if (String(doc.data().emisor.localeCompare(details.emisor)) === String(0) && (String(doc.data().receptor.localeCompare(idAmigo)) === String(0))) {
        existePeticion = true;
      }
    })
    if (existePeticion) {
      return true;
    }
    else {
      return false;
    }
  };


  const existeUsuario = async (idAmigo) => {
    const querySnapShot = await db.collection('users').get();
    var existeUsuario = false;
    querySnapShot.forEach(doc => {
      if (String(doc.data().email.localeCompare(idAmigo)) === String(0)) {
        existeUsuario = true;
      }
    })
    if (existeUsuario) {
      return true;
    }
    else {
      return false;
    }
  };



  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    getAmigos();
  }, []);

  if (window.sessionStorage.getItem('user') !== null) {
    return (
      <DocumentTitle title="Amigos">
        <div className="prueba">
          <h2 className="h2" data-testId="label">Estos son tus amig@s: </h2>
          <h4 class="card-title" id="addFriend" data-testId="addFriend">Envía una petición a un/a amig@</h4>
          <div class="wrap">
            <div class="search">
              <input type="text" class="searchTerm" placeholder="correoamigo@amigosparasiempre.es" onChange={e => setDetails({ ...details, receptor: e.target.value })} id="input" />
              <button type="submit" class="searchButton" onClick={() => addFriend(document.getElementById("input").value)}>
                <SearchOutlinedIcon className="iconSearch" />
              </button>
            </div>
          </div>



          <br></br>
          <div className="col-md-16 p-2">
          
            {amigos.map(amigo => (
              
              <div class="card bg-info text-white" >
                
                <div class="card-body">
                  <h2 class="card-title" id="friendName">
                    
                    <Name src={amigo.nombre}>{amigo.nombre}</Name>
                  </h2>
                  <center>
                    <div className="botones p-2">
                      <button className="btn btn-light" id="botonOpcion" /*onClick={() => chatear(usuarioActivo, amigo)} */ data-testId="btnChatear" >Chatear</button>
                      <button className="btn btn-light" id="botonOpcion" /*onClick={() => verUbicación(amigo)} */ data-testId="btnUbicacion"  >Ver ubicación </button>
                      <button className="btn btn-light" id="botonOpcion" /*onClick={() => eliminarAmigo(amigo)} */ data-testId="btnEliminar"  >Eliminar </button>
                    </div>
                  </center>
                </div>
              </div>
            )
            
            )}
            
          </div>
          <br></br>
        </div>
      </DocumentTitle>
    );
  }
  else {
    //Redireccionar a login

  }

}

export default Friends;