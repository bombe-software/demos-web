import React, { Component } from 'react';

import { Link } from "react-router-dom";

import { graphql } from 'react-apollo';
import TextField from 'material-ui/TextField';
import signup from '../queries/signup';
import { Form, Field } from "react-final-form";

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    console.log(values);
    /*
    const {
      nombre, email, password,
      curp, avatar, localidad
    } = values;
    this.props.mutate({
      variables: {
        nombre, email, password,
        curp, avatar, localidad
      }
    }).then(alert('Informacion enviada'));
    */
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
          <div className="section">
            <div className="columns">
              <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                <div className="box"> <h1 className="title is-3">Registro</h1><p>Ingrese la siguiente información</p><hr />
                  <Form
                    onSubmit={this.onSubmit}
                    validate={values => {
                      const errors = {};
                      if (!values.nombre) {
                        errors.nombre = "Ingrese su nombre de usuario";
                      }
                      if (!values.email) {
                        errors.email = "Ingrese su email";
                      }
                      if (!values.password) {
                        errors.password = "Ingrese su password";
                      }
                      return errors;
                    }}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                      <form onSubmit={handleSubmit}>
                        <Field name="nombre">
                          {({ input, meta }) => (
                            <div>
                              <TextField hintText="Nombre de usuario" floatingLabelText="Usuario"
                                errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text" />
                            </div>
                          )}
                        </Field>
                        <Field name="email">
                          {({ input, meta }) => (
                            <div>
                              <TextField hintText="Ingrese su email" floatingLabelText="E-mail"
                                errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text" />
                            </div>
                          )}
                        </Field>
                        <Field name="password">
                          {({ input, meta }) => (
                            <div>
                              <TextField hintText="Ingrese usuario" floatingLabelText="Password"
                                errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text" />
                            </div>
                          )}
                        </Field>
                        <div className="buttons">
                          <button type="submit" disabled={submitting}>
                            Submit
                          </button>
                        </div>
                      </form>
                    )}
                  />
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