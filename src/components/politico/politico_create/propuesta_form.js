import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from "material-ui/DatePicker";
import { Form, Field } from "react-final-form";
//Queries y Mutations
import fetchTipoPropuesta from './../../../queries/fetchTipoPropuesta';
import addPropuesta from "../../../queries/addPropuesta";
import fetchUsuario from "../../../queries/fetchUsuario";

class PropuestaForm extends Component {

  constructor(props) {
    super(props);
  this.state = {
      tipo_propuesta: '',

    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }
  renderTipoPropuesta() {
    const array = [{ id: '0', tipo: 'Opcion default' }]
      .concat(this.props.fetchTipoPropuesta.tipos_propuesta);
    return array.map(({ id, tipo }) => {
      return (
        <MenuItem value={id} key={id} primaryText={tipo} />
      );
    });

  }

  handleChangeDate(event, date) {
    this.setState({
      fecha: date,
    });
  };

  async onSubmit(values) {

    const usuario = this.props.fetchUsuario.usuario.id;
    const politico = this.props.match.params.id;
    const {
      titulo, descripcion, fecha, tipo_propuesta, referencia
    } = this.state

    this.props.mutate({
      variables: {
        titulo, descripcion, fecha, tipo_propuesta, referencia, usuario, politico
      }
    }).then(alert('Informacion enviada'));
  };

  render() {
    if (this.props.fetchTipoPropuesta.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <section className="hero is-large">
          <div className="section">
            <div className="columns">
              <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                <div className="box">
                  <br />
                  <h1 className="title">
                    Registrar una propuesta
                </h1>
                  <br />
                  <p className="subtitle">
                    Registra una propuesta que haya realizado este político
                  y que no aparezca en nuestra página. Cree un título que
                  resuma la propuesta y escriba los detalles en el campo
                  descripción.
                </p>
                  <br />
                  <Form
                    onSubmit={this.onSubmit}
                    validate={values => {
                      const errors = {};
                     if (!values.titulo) {
                        errors.titulo = "Ingrese su nombre del evento";
                      }
                        if (!values.descripcion) {
                        errors.descripcion = "Ingrese su nombre del evento";
                      }
                        if (!values.tipo_propuesta) {
                        errors.tipo_propuesta = "Ingrese su nombre del evento";
                      }
                        if (!values.fuente) {
                        errors.fuente = "Ingrese su nombre del evento";
                      }

                      return errors;
                    }}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                      <form onSubmit={handleSubmit}>
                        <Field name="titulo">
                          {({ input, meta }) => (
                            <div>
                              <TextField hintText="Titulo de la propuesta" floatingLabelText="Titulo"
                                errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text" />
                            </div>
                          )}
                        </Field>
                        <Field name="descripcion">
                          {({ input, meta }) => (
                            <div>
                              <TextField hintText="Ingrese la descripcion" floatingLabelText="Descripcion"
                                errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text" />
                            </div>
                          )}
                        </Field>
                       
                        <Field name="tipo_propuesta">
                          {({ input, meta }) => (
                            <div>
                              <SelectField hintText="Tipo de propuesta" floatingLabelText="Tipo" value="hola"
                                 errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text">
                                {this.renderTipoPropuesta()}
                              </SelectField>
                            </div>
                          )}
                        </Field>
                        <Field name="fuente">
                          {({ input, meta }) => (
                            <div>
                              <TextField hintText="Ingrese la fuente de referencia" floatingLabelText="Fuente"
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



export default compose(
  graphql(fetchTipoPropuesta,
    {
      name: 'fetchTipoPropuesta'
    }),
  graphql(addPropuesta,
    {
      name: 'addPropuesta'
    }),
  graphql(fetchUsuario,
    {
      name: 'fetchUsuario'
    }),
)(PropuestaForm);