import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';

import NeedLogin from './../../generic/need_login';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from "material-ui/DatePicker";
import { Form, Field } from "react-final-form";
import GenericForm from '../../generic/generic_form';
//Queries y Mutations
import fetchTipoPropuesta from './../../../queries/fetchTipoPropuesta';
import addPropuesta from "../../../queries/addPropuesta";
import fetchUsuario from "../../../queries/fetchUsuario";

class PropuestaForm extends GenericForm {

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

  } 

  async onSubmit(values) {

    const usuario = this.props.fetchUsuario.usuario.id;
    const politico = this.props.match.params.id;
    const {
      titulo, descripcion, fecha, tipo_propuesta, referencia
    } = values
    console.log(titulo, descripcion,fecha, tipo_propuesta, referencia);
    
    this.props.addPropuesta({
      variables: {
       titulo, descripcion, fecha, tipo_propuesta, referencia, usuario, politico
      
    }}).then(()=>this.props.history.push(`/politico/${this.props.match.params.id}`)); 

  };

  render() {
    if (this.props.fetchTipoPropuesta.loading) {
      return <div>Loading...</div>;
    }
    if (!this.props.fetchUsuario.usuario){
      return (
        <NeedLogin />
      );
    }
    console.log(this.props);
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
                              hintText="Escribe el titulo del evento"
                              floatingLabelText="Titulo"
                            />
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <Field name="descripcion"
                              component={this.renderTextField}
                              hintText="Escribe la descripcion"
                              floatingLabelText="Descripcion"
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
                              component={this.renderTextField}
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
    })
)(PropuestaForm);