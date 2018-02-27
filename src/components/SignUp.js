import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { graphql } from 'react-apollo';
import { Form, Field } from "react-final-form";

import WaveBackground from './generic/wave_background';

import signup from '../queries/signup';
import GenericForm from './generic/generic_form';


class SignUp extends GenericForm {

  /**
   * Inicializa el state en donde se colocan
   * las clases activas de los avatares y 
   * el avatar seleccionado actual
   * @constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      localidad: "localidad",
      imgAvatar: ['none', 'none', 'none', 'none'],
      error: ''
    };
    this.updateJaiba = this.updateJaiba.bind(this);
    this.updateAnguila = this.updateAnguila.bind(this);
    this.updateChivo = this.updateChivo.bind(this);
    this.updateErizo = this.updateErizo.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
  * Cambia el avatar actualmente seleccionado a Jaiba.jpg
  * @method updateJaiba
  * @const state.avatar Hace referencia al avatar actualmente seleccionado
  * @const state.imgAvatar Hace referencia a las clases(css) que tiene cada imagen
  */
  updateJaiba() {
    this.setState({
      avatar: "jaiba",
      imgAvatar: ['selected', 'none', 'none', 'none']
    })
  }

  /**
  * Cambia el avatar actualmente seleccionado a Anguila.jpg
  * @method updateAnguila
  * @const state.avatar Hace referencia al avatar actualmente seleccionado
  * @const state.imgAvatar Hace referencia a las clases(css) que tiene cada imagen
  */
  updateAnguila() {
    this.setState({
      avatar: "anguila",
      imgAvatar: ['none', 'selected', 'none', 'none']
    })
  }

  /**
  * Cambia el avatar actualmente seleccionado a Chivo.jpg
  * @method updateChivo
  * @const state.avatar Hace referencia al avatar actualmente seleccionado
  * @const state.imgAvatar Hace referencia a las clases(css) que tiene cada imagen
  */
  updateChivo() {
    this.setState({
      avatar: "chivo",
      imgAvatar: ['none', 'none', 'selected', 'none']
    })
  }

  /**
  * Cambia el avatar actualmente seleccionado a Erizo.jpg
  * @method updateErizo
  * @const state.avatar Hace referencia al avatar actualmente seleccionado
  * @const state.imgAvatar Hace referencia a las clases(css) que tiene cada imagen
  */
  updateErizo() {
    this.setState({
      avatar: "bussines",
      imgAvatar: ['none', 'none', 'none', 'selected']
    })
  }

  async onSubmit(values) {
    if(this.state.avatar == ''){
      this.setState({error: 'Selecciona un avatar'})
    }else{
      const {avatar, localidad} = this.state;
      const {
        nombre, email, password,
        curp
      } = values;
      this.props.mutate({
        variables: {
          nombre, email, password, localidad,
          curp, avatar, localidad
        }
      }).then(alert('Informacion enviada'));
    }
  };



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
          <section className="hero is-large">
            <div className="section">
              <div className="columns">
                <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                  <div className="box"> <h1 className="title is-3">Registro</h1><p>Ingrese la siguiente información</p><hr />
                    <Form
                      onSubmit={this.onSubmit}
                      validate={values => {
                        
                        const errors = {};
                        if (!values.nombre) {
                          errors.nombre = "Escriba su nombre de usuario";
                        }
                        if (values.nombre != undefined) {
                          var ra = /^[a-z0-9]+$/i;
                          if (!ra.test(values.nombre)) {
                            errors.nombre = "Solo puede contener alfa numericos y sin espacios";
                          }
                        }
                        if (!values.email) {
                          errors.email = "Escriba su email";
                        }
                        if (!values.password) {
                          errors.password = "Escriba su contraseña";
                        }
                        if (values.password != undefined) {
                          var re = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{6,}$/;
                          if (!re.test(values.password)) {
                            errors.password = "Min. 6 caractéres, 1 mayuscula, 1 minuscula y sin espacios";
                          }
                        }
                        if (!values.Rpassword) {
                          errors.Rpassword = "Escriba su contraseña";
                        }
                        if (!values.curp) {
                          errors.curp = "Escriba su curp";
                        }
                        if (values.curp != undefined) {
                          var ri = /^([A-Z]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM](AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[A-Z]{3}[0-9A-Z]\d)$/i
                          if (!ri.test(values.curp)) {
                            errors.curp = "CURP invalido";
                          }
                        }
                        if (values.password != values.Rpassword) {
                          errors.Rpassword = "Asegurese que las contraseñas coincidan";
                        }
                        if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                          errors.email = 'Correo inválido';
                        }
                        return errors;
                        
                      }}
                      render={({ handleSubmit, reset, submitting, pristine, values }) => (
                        <form onSubmit={handleSubmit}>
                          <div className="columns">
                            <div className="column">
                              <div className="level">
                                <div className="level-item">
                                  <Field name="nombre"
                                    component={this.renderTextField}
                                    hintText="Escribe tu nombre"
                                    floatingLabelText="Nombre"
                                  />
                                </div>
                              </div>
                              <div className="level">
                                <div className="level-item">
                                  <Field name="email"
                                    component={this.renderTextField}
                                    hintText="Ingrese su email"
                                    floatingLabelText="Email"
                                  />
                                </div>
                              </div>
                              <div className="level">
                                <div className="level-item">
                                  <Field name="password"
                                    type="password"
                                    component={this.renderTextField}
                                    hintText="Ingrese su password"
                                    floatingLabelText="Password"
                                  />
                                </div>
                              </div>
                              <div className="level">
                                <div className="level-item">
                                  <Field name="Rpassword"
                                    type="password"
                                    component={this.renderTextField}
                                    hintText="Ingrese nuevamente su password"
                                    floatingLabelText="Password"
                                  />
                                </div>
                              </div>
                              <div className="level">
                                <div className="level-item">
                                  <Field name="curp"
                                    component={this.renderTextField}
                                    hintText="Ingrese su curp"
                                    floatingLabelText="CURP"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="column">
                              <div>
                                <div>
                                  <div className="level">
                                    <div className="level-item">
                                      <h2 className="is-size-5">Seleccione un avatar</h2>
                                    </div>
                                  </div>
                                </div><br />
                                <div className="level">
                                  <div className="level-item"></div>
                                  <div className="level-item has-text-centered">
                                    <label>
                                      <input type="radio" name="imagen" selected />
                                      <img src="./assets/img/jaiba.svg" className={this.state.imgAvatar[0] + " image is-64x64"} width="100px" height="100px" onClick={this.updateJaiba} />
                                    </label>
                                  </div>

                                  <div className="level-item has-text-centered">
                                    <label>
                                      <input type="radio" name="imagen" />
                                      <img src="./assets/img/anguila.svg" className={this.state.imgAvatar[1] + " image is-64x64"} width="100px" height="100px" onClick={this.updateAnguila} />
                                    </label>
                                  </div>
                                  <div className="level-item"></div>

                                </div>
                                <div className="level">

                                  <div className="level-item"></div>
                                  <div className="level-item has-text-centered">
                                    <label>
                                      <input type="radio" name="imagen" />
                                      <img src="./assets/img/chivo.svg" className={this.state.imgAvatar[2] + " image is-64x64"} width="100px" height="100px" onClick={this.updateChivo} />
                                    </label>
                                  </div>

                                  <div className="level-item has-text-centered">
                                    <label>
                                      <input type="radio" name="imagen" />
                                      <img src="./assets/img/hedgehog.svg" className={this.state.imgAvatar[3] + " image is-64x64"} width="100px" height="100px" onClick={this.updateErizo} />
                                    </label>
                                  </div>
                                  <div className="level-item"></div>
                                </div>
                                <br />
                              </div>
                              <div className="level">
                                <div className="level-item">
                                  <code>{this.state.error}</code>
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
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <WaveBackground />
      </div>
    );
  }
}

export default graphql(signup)(SignUp);