import React, { Component } from "react";

import updateUsuario from '../../mutations/updateUsuario';

import { Form, Field } from "react-final-form";
import GenericForm from './../generic/generic_form';

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
    });
    location.reload();
  }

  render() {
    return (
      <div className="box"> <h1 className="is-size-4">Cambia tu nombre de usuario</h1><hr />
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
              <div className="has-text-centered">
                <button type="submit" className="button is-primary" disabled={submitting}>
                  Cambiar nombre de usuario
                </button>
              </div>
            </form>
          )}
        />
      </div>
    );
  }
}
export default Usuario;