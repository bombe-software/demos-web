import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { graphql, compose } from 'react-apollo';

import login from "./../mutations/login";
import query from "./../queries/fetchUsuario";

import WaveBackground from './generic/wave_background';

import { Form, Field } from "react-final-form";
import TextField from 'material-ui/TextField';

class Login extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            error: ''
        }
    }

    async onSubmit(values) {

        const { email, password } = values;
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        })
            .then(() => this.props.history.push("/"))
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

    /**
     /**
      * Realiza el renderizado de la aplicacion 
    * en base a la informacion anterior
    * @returns La cadena HTML que sera mostrada al usuario
    * @method render
    */
    render() {
        return (
            <div>
                <section className="hero is-large">
                    <div className="section">
                        <div className="columns">
                            <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                                <div className="box"><h1 className="title is-3">Inicio de sesión</h1><hr />
                                    <Form
                                        onSubmit={this.onSubmit}
                                        validate={values => {
                                            const errors = {};
                                            if (!values.email) {
                                                errors.email = "Ingrese su email";
                                            }
                                            if (!values.password) {
                                                errors.password = "Ingrese su password";
                                            }
                                            return errors;
                                        }}
                                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="level">
                                                    <div className="level-item">
                                                        <Field name="email">
                                                            {({ input, meta }) => (
                                                                <div>
                                                                    <TextField hintText="Ingrese su email" floatingLabelText="E-mail"
                                                                        errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text" />
                                                                </div>
                                                            )}
                                                        </Field>
                                                    </div></div>
                                                <div className="level">
                                                    <div className="level-item">
                                                        <Field name="password" type="password" >
                                                            {({ input, meta }) => (
                                                                <div>
                                                                    <TextField hintText="Ingrese usuario" floatingLabelText="Password"
                                                                        errorText={(meta.error && meta.touched) ? meta.error : ""} {...input} type="text" />
                                                                </div>
                                                            )}
                                                        </Field>
                                                    </div>
                                                </div>
                                                <div className="level">
                                                    <div className="level-item">
                                                        <code>
                                                        {this.state.error}
                                                        </code>
                                                    </div>
                                                </div>
                                                <div className="buttons has-text-centered">
                                                    <button type="submit" className="button is-primary" disabled={submitting}>
                                                        Iniciar Sesión
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

export default graphql(query)(graphql(login)(Login));