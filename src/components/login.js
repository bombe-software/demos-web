import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Link } from "react-router-dom";
import login from "./../mutations/login";
import query from "./../queries/fetchUsuario";
import WaveBackground from './generic/wave_background';
import { demos_krb_http } from './../../deploy';

import { Form, Field } from "react-final-form";
import GenericForm from './generic/generic_form';
class Login extends GenericForm {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            error: ''
        }
    }

    async onSubmit(values) {
        const { email, password } = values;
        const ticket = {
            email,
            date: (new Date().getDay() + "/" + new Date().getMonth() + "/" + new Date().getFullYear())
        };

        const request = axios.post(`${demos_krb_http}/ticket_controller`, ticket);

        request.then(({ data }) => {
            if (data.message != 404) {
                let bytes = CryptoJS.AES.decrypt(data.message, values.password);
                if (bytes.words[0] == 2065855593) {
                    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
                    this.props.mutate({
                        variables: {
                            email,
                            password: decryptedData.ticket
                        },
                        refetchQueries: [{ query }]
                    })
                        .then(() => this.props.history.push("/"))
                        .catch(res => {
                            const errors = res.graphQLErrors.map(error => error.message);
                            const error = errors[0]
                            this.setState({ error });
                        });
                } else {
                    this.setState({ error: "Password o email incorrecto." });
                }
            } else {
                this.setState({ error: "Password o email incorrecto." });
            }
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
        if (this.props.data.loading) { return (<div>Loading...</div>); }
        else {
            if (this.props.data.usuario) {
                this.props.history.push(`/`);
                return (<div>Loading...</div>);
            } else
                return (
                    <div>
                        <section className="hero is-large">
                            <div className="section">
                                <div className="columns">
                                    <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                                        <div className="box"><h1 className="title is-2">Inicio de sesión</h1><hr />
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
                                                    if (!values.password) {
                                                        errors.password = "Ingrese su password";
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
                                                        <div className="level">
                                                            <div className="level-item">
                                                                <Field name="password"
                                                                    component={this.renderPasswordField}
                                                                    hintText="Ingrese su password"
                                                                    floatingLabelText="Password"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='level'>
                                                            <div className='level-item'>
                                                                <Link to={`/recover_password/`}>
                                                                    <span className="is-6"><i className="center" className="fa fa-pencil"></i>Olvidaste tu contrasena?</span>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                        <code>
                                                            {this.state.error}
                                                        </code>
                                                        <br />
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
}

export default graphql(query)(graphql(login)(Login));