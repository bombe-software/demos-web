import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql, compose } from 'react-apollo';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { Form, Field } from "react-final-form";

import addPolitico from './../../../queries/addPolitico';
import fetchPartidos from './../../../queries/fetchPartidos';
import fetchUsuario from './../../../queries/fetchUsuario';
import fetchEstados from './../../../queries/fetchEstados';
import fetchGradoAcad from './../../../queries/fetchGradoAcad';
import fetchLugarEstudio from './../../../queries/fetchLugarEstudio';

class PoliticoForm extends Component {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(values) {
    const idUsuario = this.props.fetchUsuario.usuario.id;
    const {
      nombre, cargo, estado, titulo, grado_academico, lugar_estudio, partido
    } = this.state
    this.props.addPolitico({
      variables: {
        nombre, cargo, partido, estado, lugar_estudio, grado_academico, titulo, idUsuario
      }
    }).then(alert('Informacion enviada'));
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
                        errors.nombre = "Escriba el nombre completo";
                      }
                      if (/^\s+|\s+$/.test(values.nombre)) {
                        errors.nombre = "Escriba un nombre completo válido";
                      }
                      if (!values.partido) {
                        errors.partido = "Seleccione el partido";
                      }
                      if (!values.estado) {
                        errors.estado = "Seleccione el estado";
                      }
                      if (!values.cargo) {
                        errors.cargo = "Seleccione el cargo";
                      }
                      if (!values.grado_academico) {
                        errors.grado_academico = "Seleccione el grado academico";
                      }
                      if (!values.lugar_estudio) {
                        errors.lugar_estudio = "Seleccione el lugar de estudio";
                      }
                      if (!values.titulo) {
                        errors.titulo = "Ingrese el titulo de estudio";
                      }
                      if (!values.referencia) {
                        errors.referencia = "Escriba el link de referenica";

                      } else if (values.referencia != undefined) {
                        var re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
                        if (/^\s+|\s+$/.test(values.referencia)) {
                          errors.referencia = "Link invalido";
                        } else
                          if (!re.test(values.referencia)) {
                            errors.referencia = "Link invalido";
                          }
                      }
                      return errors;
                    }}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                      <form onSubmit={handleSubmit}>
                        <Field name="nombre">
                          {({ input, meta }) => (
                            <div>
                              <TextField hintText="Ingrese el nombre del politico" floatingLabelText="Nombre"
                                errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text" />
                            </div>
                          )}
                        </Field>
                        <Field name="partido">
                          {({ input, meta }) => (
                            <div>
                              <SelectField hintText="Partido politico" floatingLabelText="Partido politico"
                                errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text">
                                {this.props.fetchPartidos.partidos.map(({ id, nombre }) => {
                                  return <MenuItem value={id} key={id} primaryText={nombre} />
                                })}
                              </SelectField>
                            </div>
                          )}

                        </Field>
                        <Field name="cargo">
                          {({ input, meta }) => (
                            <div>
                              <SelectField hintText="Cargo politico" floatingLabelText="Cargo"
                                errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text">
                                <MenuItem value="Politico" key={1} primaryText={"Politico"} />
                                <MenuItem value="Candidato" key={2} primaryText={"Candidato"} />
                              </SelectField>
                            </div>
                          )}
                        </Field>

                        <Field name="estado">
                          {({ input, meta }) => (
                            <div>
                              <SelectField hintText="Estado" floatingLabelText="Estado"
                                errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text">
                                {this.props.fetchEstados.estados.map(({ id, nombre }) => {
                                  return <MenuItem value={id} key={id} primaryText={nombre} />
                                })}
                              </SelectField>
                            </div>
                          )}
                        </Field>
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
                        <br/>
                        <Field name="referencia">
                          {({ input, meta }) => (
                            <div>
                              <TextField hintText="Ingrese el link de referencia" floatingLabelText="Referencia"
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

