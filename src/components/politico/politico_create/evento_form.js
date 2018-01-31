import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from 'react-apollo';
import { graphql } from 'react-apollo';
import addEvento from './../../../queries/addEvento';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { Form, Field } from "react-final-form";

class EventoForm extends Component{

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

 async onSubmit(values) {
    const {
      fecha, titulo,
      descripcion, fuente
    } = this.state

    this.props.mutate({
      variables: {
        fecha, titulo,
      descripcion, fuente
      }
    }).then(alert('Informacion enviada'));
  };
  /**
  * Es una forma de capturar cualquier error en la clase 
  * y que este no crashe el programa, ayuda con la depuracion
  * de errores
  * @method componentDidCatch
  * @const info Es más informacion acerca del error
  * @const error Es el titulo del error
  */
  render() {

    return (
      <div>

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
                      if (!values.nombre) {
                        errors.nombre = "Ingrese su nombre del evento";
                      }
                      if (!values.titulo) {
                        errors.titulo = "Ingrese el titulo";
                      }
                      if (!values.descripcion) {
                        errors.descripcion = "Ingrese la descripcion";
                      }
                      if (!values.fuente) {
                        errors.fuente = "Ingrese la fuente de referencia";
                      }
                      return errors;
                    }}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                      <form onSubmit={handleSubmit}>
                        <Field name="nombre">
                          {({ input, meta }) => (
                            <div>
                               <DatePicker hintText="Fecha" 
                               errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} />
                            </div>
                          )}
                        </Field>
                        <Field name="titulo">
                          {({ input, meta }) => (
                            <div>
                              <TextField hintText="Ingrese el titulo" floatingLabelText="Titulo"
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
                </div></div></div></div></section>
      </div>
    );
  }
}

export default compose(
  graphql(addEvento,
    {
      name: 'addEvento'
    })
)(EventoForm);