import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Form, Field } from "react-final-form";


import WaveBackground from './../../reutilizables/wave_background';
import GenericForm from './../../reutilizables/generic_form';
import LoadingScreen from './../../reutilizables/loading_screen';

//Queries y Mutations
import query from "../../../queries/propuesta_form";
import add_propuesta from "../../../mutations/add/propuesta";


class PropuestaForm extends GenericForm {
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
    this.props.history.push(`/politico/${this.props.match.params.id}`)
  };

  async onSubmit(values) {
    const usuario = this.props.id_usuario;
    const {
      titulo, descripcion, fecha, tipo_propuesta, referencia
    } = values;

    if(!this.props.o){
      const politico = this.props.match.params.id;
      this.props.mutate({
        variables: {
          titulo, descripcion, fecha, tipo_propuesta, referencia, usuario, politico
        }
      }).then(this.handleOpen); 
    }else{
      this.props.o.mutate({variables: { titulo, descripcion, fecha, tipo_propuesta, referencia, usuario, politico: this.props.o.propuesta.politico.id } });
      this.handleOpen();
    }
  };

  render() {
    if (this.props.data.loading) {
      return <LoadingScreen />;
    }
    return (
      <div>
        <Dialog
          title="Tu propuesta ahora está en espera de aprobación"
          actions={[<FlatButton label="Aceptar" primary={true} keyboardFocused={false} onClick={this.handleClose} />]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Espera la aprobación de un moderador de tu solicitud para agregar una propuesta del político.
        </Dialog>
        <section className="hero is-large">
          <div className="section">
            <div className="columns">
              <div className="column is-6-desktop is-10-tablet is-offset-3-desktop is-offset-2-tablet">
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
                    initialValues={!this.props.o ? {} : this.props.o.propuesta }
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
                         var re = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/
                        if (/^\s+|\s+$/.test(values.referencia)) {
                          errors.referencia = "Link invalido";
                        } else
                          if (!re.test(values.referencia)) {
                            errors.referencia = "Los links deben empezar con http,https. (http(s)://www.demos.com)";
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
                              component={this.renderTextArea}
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
                              {this.props.data.tipo_propuestas.map(({ id, tipo }) => {
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
                              defaultDate={!this.props.o ? new Date() : new Date(values.fecha)}
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
                        <br />
                        <div className="buttons has-text-centered">
                          <button type="submit" className="button is-primary" disabled={submitting}>
                            Registrar Propuesta
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
        <WaveBackground />
      </div>
    );
  }
}
export default  graphql(add_propuesta)(graphql(query)(PropuestaForm));