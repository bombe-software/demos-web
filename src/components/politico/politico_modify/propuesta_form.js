import React, { Component } from "react";

import { compose, graphql } from 'react-apollo';

import NeedLogin from './../../generic/need_login';
import AnimatedBackground from './../../generic/animated_background';


import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Form, Field } from "react-final-form";
import GenericForm from '../../generic/generic_form';
//Queries y Mutations
import fetchTipoPropuesta from './../../../queries/fetchTipoPropuesta';
import addPropuesta from "../../../queries/addPropuesta";
import fetchUsuario from "../../../queries/fetchUsuario";
import fetchPropuesta from '../../../queries/fetchPropuesta'

const load = async (props) => {
  if(props.loading)return <div>Loading...</div>;
  return {
    titulo: props.propuesta.titulo,
    descripcion: props.propuesta.descripcion,
    tipo_propuesta: props.propuesta.tipo_propuesta.id,
    fecha: props.propuesta.fecha
  };
};

class ModificarPropuestaForm extends GenericForm {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      open: false,
      data: {}
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen(){
    this.setState({ open: true });
  };

  handleClose(){
    this.setState({ open: false });
    this.props.history.push(`/politico/${this.props.match.params.id}`)
  };

  componentWillReceiveProps(props){
{this.renderFetchField(props.fetchPropuesta)}
}

 async renderFetchField(props) {
    this.setState({ loading: true });
    const data = await load(props);
    this.setState({ loading: false, data });
   }
  async onSubmit(values) {

    const usuario = this.props.fetchUsuario.usuario.id;
    const politico = this.props.match.params.id;
    const {
      titulo, descripcion, fecha, tipo_propuesta, referencia
    } = values

    this.props.addPropuesta({
      variables: {
        titulo, descripcion, fecha, tipo_propuesta, referencia, usuario, politico
      }
    }).then(this.handleOpen); 

  };

  render() {
    if (this.props.fetchTipoPropuesta.loading) {
      return <div>Loading...</div>;
    }
    if (!this.props.fetchUsuario.usuario) {
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
                <div className="box">
                  <br />
                  <h1 className="title">
                    Modificar una propuesta
                </h1>
                  <br />
                  <p className="subtitle">
                    ¿Encontro un informacion incorrecta en los datos de alguna propuesta?
                  Brindenos su información y solicite modificarlo para
                  que toda nuestra comunidad pueda verlo.
                </p>
                  <br />
                  <Form
                    onSubmit={this.onSubmit} initialValues={this.state.data}
                    validate={values => {
                      const errors = {};
                      if (!values.titulo) {
                        errors.titulo = "Escriba el nombre de la propuesta";
                      } else if (/^\s+|\s+$/.test(values.titulo)) {
                        errors.titulo = "Escriba una propuesta valida";
                      }
                      if (!values.descripcion) {
                        errors.descripcion = "Escriba la descripción";
                      } else if (/^\s+|\s+$/.test(values.descripcion)) {
                        errors.descripcion = "Escriba descripción válida";
                      }
                      if (!values.tipo_propuesta) {
                        errors.tipo_propuesta = "Seleccione el tipo de propuesta";
                      }
                      if (!values.fecha) {
                        errors.fecha = "Seleccione la fecha";
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
                    }
                    }
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="level">
                          <div className="level-item">
                            <Field name="titulo"
                              component={this.renderTextField}
                              hintText="Escribe el título del evento"
                              floatingLabelText="Título"
                            />
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <Field name="descripcion"
                              component={this.renderTextField}
                              hintText="Escribe la descripción"
                              floatingLabelText="Descripción"
                            />
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="tipo_propuesta"
                              component={this.renderSelectField}
                              hintText="Escribe tipo de la propuesta"
                              floatingLabelText="Tipo de la propuesta"
                            >
                              {this.props.fetchTipoPropuesta.tipos_propuesta.map(({ id, tipo }) => {
                                return <MenuItem value={id} key={id} primaryText={tipo} />
                              })}
                            </Field>
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <Field name="fecha"
                              component={this.renderDateField}
                              hintText="Seleccione la fecha"
                              floatingLabelText="Fecha"
                            />
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <Field name="referencia"
                              component={this.renderTextField}
                              hintText="Escribe el link de referencia"
                              floatingLabelText="Referencia"
                            />
                          </div>
                        </div>
                        <div className="buttons has-text-centered">
                          <button type="submit" className="button is-primary" disabled={submitting}>
                            Registrar Evento
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
    graphql(fetchPropuesta,
    {
      name: 'fetchPropuesta',
      options: (props) => { return { variables: { id: props.match.params.id_propuesta} } }
    })
)(ModificarPropuestaForm);