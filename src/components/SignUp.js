import React, { Component } from 'react';

import { Link } from "react-router-dom";

import { graphql } from 'react-apollo';

import signup from '../queries/signup';


class SignUp extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            nombre: '',
            email: '',
            password: '',
            curp: '',
            avatar: '',
            localidad: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const {
            nombre, email, password,
            curp, avatar, localidad
        } = this.state
        console.log(this.props);
        this.props.mutate({
            variables: {
                nombre, email, password,
                curp, avatar, localidad
            }
        }).then(alert('Informacion enviada'));
    }


  /**
  * Es una forma de capturar cualquier error en la clase 
  * y que este no crashe el programa, ayuda con la depuracion
  * de errores
  * @method componentDidCatch
  * @const info Es más informacion acerca del error
  * @const error Es el titulo del error
  */
  componentDidCatch(error, info) {
    console.log("Error: " + error);
    console.log("Info: " + info);
  }

  /**
  /**
  * Realiza el renderizado de la aplicacion 
  * en base a la informacion anterior
  * @returns La cadena HTML que sera mostrada al usuario
  * @method render
  */
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <section className="hero is-large">
          <div className="section">
            <div className="columns">
              <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                <div className="box"> <h1 className="title is-3">Registro</h1><p>Ingrese la siguiente información</p><hr />
                  <form onSubmit={this.handleSubmit}>
                    <div className="columns">

                      <div className="column">

                        <div className="level">
                          <div className="level-item">
                            <input 
                                className="input"
                                type="text" 
                                placeholder="Nombre de Usuario" 
                                label="Nombre de Usuario"
                                onChange={event => this.setState({ nombre: event.target.value })}
                                value={this.state.nombre}
                            /> 
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <input 
                                className="input"
                                type="text"
                                placeholder="example@domain.com"
                                label="Correo electronico"
                                onChange={event => this.setState({ email: event.target.value })}
                                value={this.state.email}
                            /> 
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <input 
                                className="input"
                                type="text"
                                placeholder="Cree contraseña"
                                label="Cree contraseña"
                                onChange={event => this.setState({ password: event.target.value })}
                                value={this.state.password}
                            />
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <input 
                                className="input"
                                type="text"
                                placeholder="Repita contraseña"
                                label="Repita contraseña"

                            />
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <input
                                className="input"
                                type="text"
                                placeholder="Ingrese su CURP" 
                                label="Ingrese su CURP"
                                onChange={event => this.setState({ curp: event.target.value })}
                                value={this.state.curp}
                            />
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <input
                                className="input"
                                type="text"
                                placeholder="Ingrese su avatar" 
                                label="Ingrese su avatar"
                                onChange={event => this.setState({ avatar: event.target.value })}
                                value={this.state.avatar}
                            />
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <input
                                className="input"
                                type="text"
                                placeholder="Ingrese su localidad" 
                                label="Ingrese su localidad"
                                onChange={event => this.setState({ localidad: event.target.value })}
                                value={this.state.localidad}
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                    <br />
                    <div className="level">
                      <div className="level-item has-text-centered">
                        <button type="submit" className="button is-primary">
                          Registrarme
                        </button>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default graphql(signup)(SignUp);