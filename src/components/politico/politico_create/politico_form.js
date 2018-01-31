import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql, compose } from 'react-apollo';

import MenuItem from 'material-ui/MenuItem';
import { Form, Field } from "react-final-form";

import GenericForm from '../../generic/generic_form';
import addPolitico from './../../../queries/addPolitico';
import fetchPartidos from './../../../queries/fetchPartidos';
import fetchUsuario from './../../../queries/fetchUsuario';
import fetchEstados from './../../../queries/fetchEstados';
import fetchGradoAcad from './../../../queries/fetchGradoAcad';
import fetchLugarEstudio from './../../../queries/fetchLugarEstudio';

class PoliticoForm extends GenericForm {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    console.log(values);
    /*
    const idUsuario = this.props.fetchUsuario.usuario.id;
    const {
      nombre, cargo, estado, titulo, grado_academico, lugar_estudio, partido
    } = this.state
    this.props.addPolitico({
      variables: {
        nombre, cargo, partido, estado, lugar_estudio, grado_academico, titulo, idUsuario
      }
    }).then(alert('Informacion enviada'));
    */
  };


  render() {

    if (this.props.fetchgrado_academico.loading || this.props.fetchLugarEstudio.loading || this.props.fetchPartidos.loading || this.props.fetchEstados.loading) {
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
                    Registrar un político
                </h1>
                  <br />
                  <p className="subtitle">
                    ¿No encuentra a un político en nuestra página?
                  Brindenos su información y solicite registrarlo para
                  que toda nuestra comunidad pueda verlo.
                </p>
                  <br />
                  <Form
                    onSubmit={this.onSubmit}
                    validate={values => {
                      const errors = {};
                      if (!values.nombre) {
                        errors.nombre = "Ingrese su nombre del evento";
                      }
                      return errors;
                    }}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                      <form onSubmit={handleSubmit}>
                        <Field name="nombre"
                          component={this.renderTextField}
                          hintText="Escribe tu nombre"
                          floatingLabelText="Nombre"
                        />

                        <Field name="partido"
                          component={this.renderSelectField}
                          hintText="Partido politico"
                          floatingLabelText="Partido"
                        >
                          {this.props.fetchPartidos.partidos.map(({ id, nombre }) => {
                            return <MenuItem value={id} key={id} primaryText={nombre} />
                          })}
                        </Field>

                        <Field name="partido"
                          component={this.renderSelectField}
                          hintText="Cargo politico"
                          floatingLabelText="Cargo"
                        >
                          <MenuItem value="Politico" key={1} primaryText={"Politico"} />
                          <MenuItem value="Candidato" key={2} primaryText={"Candidato"} />
                        </Field>

                        <Field name="partido"
                          component={this.renderSelectField}
                          hintText="Seleccione un Estado"
                          floatingLabelText="Estado"
                        >
                          {this.props.fetchEstados.estados.map(({ id, nombre }) => {
                            return <MenuItem value={id} key={id} primaryText={nombre} />
                          })}
                        </Field>

                        {/*
                        <Field name="titulo">
                          {({ input, meta }) => (
                            <div>
                              <TextField hintText="Ingrese el titulo de estudio" floatingLabelText="Titulo"
                                errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text" />
                            </div>
                          )}
                        </Field>
                        <Field name="lugar_estudio">
                          {({ input, meta }) => (
                            <div>
                              <SelectField hintText="Lugar de estudio" floatingLabelText="Lugar de estudio"
                                errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text">
                                {this.props.fetchLugarEstudio.lugares_estudio.map(({ id, nombre }) => {
                                  return <MenuItem value={id} key={id} primaryText={nombre} />
                                })}
                              </SelectField>
                            </div>
                          )}
                        </Field>
                        <Field name="grado_academico">
                          {({ input, meta }) => (
                            <div>
                              <SelectField hintText="Grado academico" floatingLabelText="Grado academico"
                                errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text">
                                {this.props.fetchgrado_academico.grados_academico.map(({ id, grado }) => {
                                  return <MenuItem value={id} key={id} primaryText={grado} />
                                })}
                              </SelectField>
                            </div>
                          )}
                        </Field>
                        */}
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
  graphql(addPolitico, {
    name: 'addPolitico'
  }),
  graphql(fetchPartidos, {
    name: 'fetchPartidos'
  }),
  graphql(fetchEstados, {
    name: 'fetchEstados'
  }),
  graphql(fetchGradoAcad, {
    name: 'fetchgrado_academico'
  }),
  graphql(fetchLugarEstudio, {
    name: 'fetchLugarEstudio'
  }),
  graphql(fetchUsuario, {
    name: 'fetchUsuario'
  })

)(PoliticoForm);

