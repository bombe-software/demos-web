import React, { Component } from "react";

import { graphql, compose } from 'react-apollo';

import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
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

class PoliticoForm extends GenericForm {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      open: false
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(){
    this.setState({ open: true });
  };

  handleClose(){
    this.setState({ open: false });
    this.props.history.push(`/politicos`);
  };

  async onSubmit(values) {
    const usuario = this.props.fetchUsuario.usuario.id;
    const {
      nombre, cargo, estado, titulo, grado_academico, lugar_estudio, partido, referencia
    } = values
    console.log(nombre, cargo, estado, titulo, grado_academico, lugar_estudio, partido, usuario, referencia);
   
    this.props.addPolitico({
      variables: {
        nombre, cargo, partido, estado, lugar_estudio, grado_academico, titulo, usuario, referencia
      }
    }).then(this.handleOpen); 
  };


  render() {

    if (this.props.fetchgrado_academico.loading || this.props.fetchLugarEstudio.loading || this.props.fetchPartidos.loading || this.props.fetchEstados.loading) {
      return <div>Loading...</div>;
    }
    if (!this.props.fetchUsuario.usuario){
      return (
        <NeedLogin />
      );
    }
    return (
      <div>
        <Dialog
          title="Tu propuesta ahora está en espera de aprobación"
          actions={[<FlatButton label="Submit" primary={true} keyboardFocused={false} onClick={this.handleClose} />]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Espera la aprobación de un moderador de tu propuesta
        </Dialog>
        <section className="hero is-large">
          <div className="section">
            <div className="columns">
              <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                <div className="box" style={{padding: "48px"}}>
                  <br />
                  <h1 className="title has-text-centered">
                    Registrar un político
                </h1>
                  <br />
                  <p className="subtitle has-text-centered">
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
  })

)(PoliticoForm);

