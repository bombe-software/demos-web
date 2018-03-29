import React, { Component } from "react";
import { compose, graphql } from 'react-apollo';

//Componentes
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import NeedLogin from './../../generic/need_login';
import WaveBackground from './../../generic/wave_background';

//Queries
import fetchUsuario from './../../../queries/fetchUsuario';
import addEvento from './../../../mutations/add/addEvento';
import { Form, Field } from "react-final-form";
import GenericForm from '../../generic/generic_form';

class EventoForm extends GenericForm {

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
    this.props.history.push(`/politico/${this.props.match.params.id}`);
  };

  async onSubmit(values) {
    const usuario = this.props.fetchUsuario.usuario.id;
    const politico = this.props.match.params.id;
    const {
      fecha, titulo,
      descripcion, referencia
    } = values


    this.props.addEvento({
      variables: {
        fecha, titulo,
        descripcion, referencia, usuario, politico
      }
    }).then(this.handleOpen); 
  }

  /**
  * Es una forma de capturar cualquier error en la clase 
  * y que este no crashe el programa, ayuda con la depuracion
  * de errores
  * @method componentDidCatch
  * @const info Es más informacion acerca del error
  * @const error Es el titulo del error
  */
  render() {
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
                  <div className="has-text-centered"><h1 className="title is-3">Registrar evento</h1></div>
                  <hr />
                  <Form
                    onSubmit={this.onSubmit}
                    validate={values => {
                      const errors = {};
                      if (!values.fecha) {
                        errors.fecha = "Seleccione la fecha";
                      }
                      if (!values.titulo) {
                        errors.titulo = "Escriba el título del evento";
                      }
                      if (values.titulo != undefined) {

                        if (/^\s+|\s+$/.test(values.titulo)) {
                          errors.titulo = "Escriba un titulo válido";
                        }
                      }
                      if (!values.descripcion) {
                        errors.descripcion = "Escriba la descripción del evento";
                      } else
                        if (/^\s+|\s+$/.test(values.descripcion)) {
                          errors.descripcion = "Escriba una descripción válida";
                        }
                      if (!values.referencia) {
                        errors.referencia = "Escriba el link de referencia";

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
                    }}
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
                        <br />
                        <div className="buttons has-text-centered">
                          <button type="submit" className="button is-primary" disabled={submitting}>
                            Registrar evento
                          </button>
                        </div>
                      </form>
                    )}
                  />
                </div></div></div></div></section>
        <WaveBackground />
      </div>
    );
  }
}

export default compose(
  graphql(addEvento,
    {
      name: 'addEvento'
    }),
  graphql(fetchUsuario,
    {
      name: 'fetchUsuario'
    })
)(EventoForm);