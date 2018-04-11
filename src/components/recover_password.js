import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Form, Field } from "react-final-form";
import GenericForm from './generic/generic_form';
import RecoverPass from './../mutations/recoverPasssword';
import fetchUsuario from './../queries/fetchUsuario';

class RecoverPassword extends GenericForm {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      error:''
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  async onSubmit(values) {
    const { email } = values;
    this.props.mutate({
      variables: {
        email
      },
    }).then(() => this.props.history.push("/login"))
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        const error = errors[0]
        this.setState({ error });
      });
  };

  /**
  * Es una forma de capturar cualquier error en la clase 
  * y que este no crashe el programa, ayuda con la depuracion
  * de errores
  * @method componentDidCatch
  * @const info Es más informacion acerca del error
  * @const error Es el titulo del error
  */
  componentDidCatch(error, info) {
    console.log("Error: " + error);
    console.log("Info: " + info);
  }

  render() {
    if(this.props.data.usuario || this.props.data.loading){
      this.props.history.push("/");
      return "Loading.."
    }else{
    return (
      <div>
        <section className="hero is-large">
          <div className="section">
            <div className="columns">
              <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                <div className="box">
                  <h1 className="title is-3">Recuperar contraseña</h1><hr />
                  <span>Ingrese el correo electronico registrado en su cuenta de Demos</span>
                  <div className="level">
                    <div className="level-item">
                      <Form
                        onSubmit={this.onSubmit}
                        validate={values => {
                          const errors = {};
                          if (!values.email) {
                            errors.email = "Ingrese su email";
                          }
                          if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                            errors.email = 'Correo inválido';
                          }
                          return errors;
                        }}
                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                          <form onSubmit={handleSubmit}>
                            <div className="level">
                              <div className="level-item">
                                <Field name="email"
                                  component={this.renderTextField}
                                  hintText="Escribe su email"
                                  floatingLabelText="Email"
                                />
                              </div>
                            </div>
                            <br />
                            <div className="level">
                              <div className="level-item">
                                <button type="submit" className="button is-primary">
                                  Cambiar
                                </button>
                              </div>
                            </div>
                          </form>
                        )}
                      />
                    </div>
                  </div>
                  <br />
                          <code>{this.state.error}</code>

                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
}
export default graphql(fetchUsuario)(graphql(RecoverPass)(RecoverPassword));