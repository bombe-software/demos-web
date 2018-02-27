import React, { Component } from "react";

import { graphql, compose } from 'react-apollo';

import MenuItem from 'material-ui/MenuItem';
import { Form, Field } from "react-final-form";

import NeedLogin from './../../generic/need_login';
import AnimatedBackground from './../../generic/animated_background';

import GenericForm from '../../generic/generic_form';
import addPolitico from './../../../queries/addPolitico';
import fetchPartidos from './../../../queries/fetchPartidos';
import fetchUsuario from './../../../queries/fetchUsuario';
import fetchEstados from './../../../queries/fetchEstados';
import fetchGradoAcad from './../../../queries/fetchGradoAcad';
import fetchLugarEstudio from './../../../queries/fetchLugarEstudio';
import fetchPolitico from './../../../queries/fetchPoliticoPerfil';


const load = async (props) => {
  if (props.loading) return <div>Loading...</div>;
  return {
    nombre: props.politicosPorId.nombre,
    partido: props.politicosPorId.partido.id,
    estado: props.politicosPorId.estado.id,
    cargo: props.politicosPorId.cargo,
    grado_academico: props.politicosPorId.estudios[0].grado_academico.id,
    lugar_estudio: props.politicosPorId.estudios[0].lugar_estudio.id,
    titulo: props.politicosPorId.estudios[0].titulo
  };
};

class ModificarPoliticoForm extends GenericForm {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async renderFetchField(props) {
    this.setState({ loading: true });
    const data = await load(props);
    this.setState({ loading: false, data });
  }

  async onSubmit(values) {
    const usuario = this.props.fetchUsuario.usuario.id;
    const {
      nombre, cargo, estado, titulo, grado_academico, lugar_estudio, partido, referencia
    } = values

    this.props.addPolitico({
      variables: {
        nombre, cargo, partido, estado, lugar_estudio, grado_academico, titulo, usuario, referencia
      }
    }).then(() => this.props.history.push(`/politicos`));
  };
  componentWillReceiveProps(props) {
    { this.renderFetchField(props.fetchPolitico) }
  }

  render() {
    if (this.props.fetchPolitico.loading || this.props.fetchgrado_academico.loading || this.props.fetchLugarEstudio.loading || this.props.fetchPartidos.loading || this.props.fetchEstados.loading) {
      return <div>Loading...</div>;
    }
    if (!this.props.fetchUsuario.usuario) {
      return (
        <NeedLogin />
      );
    }
    return (
      <div>
        <section className="hero is-large">
          <div className="section">
            <div className="columns">
              <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                <div className="box" style={{ padding: "48px" }}>
                  <br />
                  <h1 className="title has-text-centered">
                    Modificar un político
                </h1>
                  <br />
                  <p className="subtitle has-text-centered">
                    ¿Encontró información incorrecta en los datos de algún político? Bríndenos su información y solicite modificarlo para que toda nuestra comunidad pueda verlo.
                </p>
                  <br />
                  <Form
                    onSubmit={this.onSubmit} initialValues={this.state.data}
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
                        var re = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/
                        //var re = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;
                        if (/^\s+|\s+$/.test(values.referencia)) {
                          errors.referencia = "Link invalido";
                        } else
                          if (!re.test(values.referencia)) {
                            errors.referencia = "Los links deben empezar con http,https. (http(s)://www.demos.com)";
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
                              hintText="Escribe tu nombre"
                              floatingLabelText="Nombre"
                            />
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="partido"
                              component={this.renderSelectField}
                              hintText="Partido politico"
                              floatingLabelText="Partido"
                            >
                              {this.props.fetchPartidos.partidos.map(({ id, nombre }) => {
                                return <MenuItem value={id} key={id} primaryText={nombre} />
                              })}
                            </Field>
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="cargo"
                              component={this.renderSelectField}
                              hintText="Cargo politico"
                              floatingLabelText="Cargo"
                            >
                              <MenuItem value="Funcionario" key={1} primaryText={"Funcionario"} />
                              <MenuItem value="Candidato" key={2} primaryText={"Candidato"} />
                            </Field>
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="estado"
                              component={this.renderSelectField}
                              hintText="Seleccione un Estado"
                              floatingLabelText="Estado"
                            >
                              {this.props.fetchEstados.estados.map(({ id, nombre }) => {
                                return <MenuItem value={id} key={id} primaryText={nombre} />
                              })}
                            </Field>
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="grado_academico"
                              component={this.renderSelectField}
                              hintText="Ing."
                              floatingLabelText="Título"
                            >
                              {this.props.fetchgrado_academico.grados_academico.map(({ id, grado }) => {
                                return <MenuItem value={id} key={id} primaryText={grado} />
                              })}
                            </Field>
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="titulo"
                              component={this.renderTextField}
                              hintText="Derecho y Contadur[ia"
                              floatingLabelText="Estudios"
                            />
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="lugar_estudio"
                              component={this.renderSelectField}
                              hintText="Lugar de estudio"
                              floatingLabelText="Lugar de estudio"
                            >
                              {this.props.fetchLugarEstudio.lugares_estudio.map(({ id, nombre }) => {
                                return <MenuItem value={id} key={id} primaryText={nombre} />
                              })}
                            </Field>
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="referencia"
                              component={this.renderTextField}
                              hintText="Ingrese el link de referencia"
                              floatingLabelText="Referencia"
                            />
                          </div>
                        </div>
                        <br />
                        <div className="buttons has-text-centered">
                          <button type="submit" className="button is-primary" disabled={submitting}>
                            Registrar político
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
        <AnimatedBackground />
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
  }),
  graphql(fetchPolitico, {
    name: "fetchPolitico",
    options: (props) => { return { variables: { id: props.match.params.id_politico } } }
  })

)(ModificarPoliticoForm);
