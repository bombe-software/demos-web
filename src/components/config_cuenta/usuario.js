import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import updateUsuario from '../../queries/updateUsuario';

import { Form, Field } from "react-final-form";
import GenericForm from './../generic/generic_form';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

class Usuario extends GenericForm {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(values) {
    const id = this.props.id;
    const { avatar, password } = this.props
    const {
      nombre
    } = values

    this.props.mutate({
      variables: {
        id, nombre, password, avatar
      }
    }).then(alert('Informacion enviada'));
    location.reload();

  }

  render() {
    return (
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <div className="box"> <h1 className="is-size-4">Configura tu cuenta</h1><hr />
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

                return errors;
              }}
              render={({ handleSubmit, reset, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                  <div className="level">
                    <div className="level-item">
                      <Field name="nombre"
                        component={this.renderTextField}
                        hintText="Escribe tu nombre de usuario"
                        floatingLabelText="Nombre de usuario"
                      />
                    </div>
                  </div>
                  <br />
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
    );
  }
}
export default Usuario;