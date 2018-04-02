import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { Form, Field } from "react-final-form";
import GenericForm from './generic/generic_form';
import WaveBackground from './generic/wave_background';

import confirmEmail from "./../mutations/confirmEmail";


class ConfirmEmail extends GenericForm {

    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    async onSubmit(values) {
        this.props.mutate({
            variables: values
        })
        .then(some =>  this.props.history.push("/login"))
        .catch(({graphQLErrors})=>this.setState({error: graphQLErrors[0].message}))
    }

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
        const { handleSubmit } = this.props;
        return (
            <div>
                <section className="hero is-large">
                    <div className="section">
                        <div className="columns">
                            <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                                <div className="box"><h1 className="title is-3">Confrimacion de correo</h1><hr />
                                    <p>Te enviamos un correo electronico de {'info@bombesoftware.com'} con una clave, ingrésala para continuar</p>
                                    <Form
                                        onSubmit={this.onSubmit}
                                        validate={values => {
                                            const errors = {};
                                            if (!values.email) {
                                                errors.email = "Ingrese su email";
                                            }
                                            if (!values.firma) {
                                                errors.firma = "Ingrese su firma";
                                            }
                                            return errors;
                                        }}

                                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="level">
                                                    <div className="level-item">
                                                        <Field name="email"
                                                            component={this.renderTextField}
                                                            hintText="Escribe el email"
                                                            floatingLabelText="Email"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="level">
                                                    <div className="level-item">
                                                        <Field name="firma"
                                                            component={this.renderTextField}
                                                            hintText="Escribe el codigo"
                                                            floatingLabelText="Codigo"
                                                        />
                                                    </div>
                                                </div>
                                                <code>
                                                    {this.state.error}
                                                </code>
                                                <br />
                                                <div className="buttons has-text-centered">
                                                    <button type="submit" className="button is-primary" disabled={submitting}>
                                                        Confirmar email
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <WaveBackground />
                </section>
            </div>
        );
    }
}

export default graphql(confirmEmail)(ConfirmEmail);
