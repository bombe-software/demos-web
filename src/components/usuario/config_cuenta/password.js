import React, { Component } from "react";
import { graphql } from 'react-apollo';
import updateUsuario from '../../mutations/updateUsuario';

import { Form, Field } from "react-final-form";
import GenericForm from './../generic/generic_form';

class Password extends GenericForm {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    const id = this.props.id;
    const {nombre, avatar} = this.props
    const {
      password
    } = values
    this.props.mutate({
      variables: {
        id, nombre, password, avatar
      }
    });
    location.reload();

  }

  render() {
    return (
      <div className="box">
        <h1 className="is-size-4">Cambia tu password</h1><hr />
          <Form
            onSubmit={this.onSubmit}
            validate={values => {
              const errors = {};

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
              if (values.password != values.Rpassword) {
                errors.Rpassword = "Asegurese que las contraseñas coincidan";
              }

              return errors;
            }}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>

                <div className="level">
                  <div className="level-item">
                    <Field name="password"
                      component={this.renderPasswordField}
                      hintText="Ingrese su password"
                      floatingLabelText="Password"
                    />
                  </div>
                </div>
                <div className="level">
                  <div className="level-item">
                    <Field name="Rpassword"
                      component={this.renderPasswordField}
                      hintText="Ingrese nuevamente su password"
                      floatingLabelText="Password"
                    />
                  </div>
                </div>
                <br />
                <div className="has-text-centered">
                  <button type="submit" className="button is-primary" disabled={submitting}>
                    Cambiar Password
                  </button>
                </div>
              </form>
            )}
          />
      </div>
    );
  }
}
export default graphql(updateUsuario)(Password);