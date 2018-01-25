import React, { Component } from 'react';

import { Link } from "react-router-dom";

import { graphql } from 'react-apollo';

import signup from '../queries/signup';
import GenericForm from './generic/generic_form';
import Field from './generic/field';

class SignUp extends GenericForm {

  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      email: '',
      password: '',
      curp: '',
      avatar: '',
      localidad: '',
      errors: []
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
                            <Field
                              changeState={event => { this.setState({ nombre: event.target.value }) }}
                              mask={this.renderTextField}
                              value={this.state.nombre}
                              error={this.state.errors["nombre"]}
                              placeholder={"nombre"}
                              label={"Ingrese su nombre"}
                            />
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <Field
                              changeState={event => { this.setState({ email: event.target.value }) }}
                              mask={this.renderTextField}
                              value={this.state.email}
                              error={this.state.errors["email"]}
                              placeholder={"Email"}
                              label={"Escribe tu email"}
                            />
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <Field
                              changeState={event => { this.setState({ password: event.target.value }) }}
                              mask={this.renderTextField}
                              value={this.state.password}
                              error={this.state.errors["password"]}
                              placeholder={"Password"}
                              label={"Escribe tu password"}
                            />
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <Field
                              mask={this.renderTextField}
                              error={this.state.errors["passwordR"]}
                              placeholder={"passwordR"}
                              label={"Repita su contra"}
                            />
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <Field
                              changeState={event => { this.setState({ curp: event.target.value }) }}
                              mask={this.renderTextField}
                              value={this.state.curp}
                              error={this.state.errors["curp"]}
                              placeholder={"CURP"}
                              label={"Escribe tu CURP"}
                            />
                          </div>
                          </div>
                          <div className="level">
                            <div className="level-item">
                              <Field
                                changeState={event => { this.setState({ avatar: event.target.value }) }}
                                mask={this.renderTextField}
                                value={this.state.avatar}
                                error={this.state.errors["avatar"]}
                                placeholder={"avatar"}
                                label={"Seleccione avatar"}
                              />
                            </div>
                          </div>
                          <div className="level">
                            <div className="level-item">
                              <Field
                                changeState={event => { this.setState({ localidad: event.target.value }) }}
                                mask={this.renderTextField}
                                value={this.state.localidad}
                                error={this.state.errors["localidad"]}
                                placeholder={"Localidad"}
                                label={"Localidad"}
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