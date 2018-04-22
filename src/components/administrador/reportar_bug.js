import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Form, Field } from "react-final-form";
import WaveBackground from './../generic/wave_background';
import NotFound from './../../components/not_found';
import GenericForm from './../generic/generic_form';
import addBug from './../../mutations/addBug';
import fetchUsuario from './../../queries/fetchUsuario';


class ReportarBugs extends GenericForm {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            error: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }
    async onSubmit(values) {
        const { url, titulo, descripcion } = values;
        this.props.mutate({
            variables: {
                url, titulo, descripcion
            },
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

    render() {
        if (this.props.data.loading) return "Loading.."
        if (!this.props.data.usuario) {
            return (
                <NotFound />
            );
        }
        return (
            <div>
                <section className="hero is-large">
                    <div className="section">
                        <div className="columns">
                            <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                                <div className="box"><h1 className="title is-2">Reporte un bug</h1><hr />
                                    <Form
                                        onSubmit={this.onSubmit}
                                        validate={values => {
                                            const errors = {};

                                            return errors;
                                        }}

                                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="level">
                                                    <div className="level-item">
                                                        <Field name="titulo"
                                                            component={this.renderTextField}
                                                            hintText="Escribe su titulo"
                                                            floatingLabelText="Titulo"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="level">
                                                    <div className="level-item">
                                                        <Field name="descripcion"
                                                            component={this.renderTextArea}
                                                            floatingLabelText="Descripcion"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="level">
                                                    <div className="level-item">
                                                        <Field name="url"
                                                            component={this.renderTextField}
                                                            hintText="Ingrese su url"
                                                            floatingLabelText="Url"
                                                        />
                                                    </div>
                                                </div>
                                                <code>
                                                    {this.state.error}
                                                </code>
                                                <br />
                                                <div className="buttons has-text-centered">
                                                    <button type="submit" className="button is-primary" disabled={submitting}>
                                                        Reportar Bug
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

export default graphql(fetchUsuario)(graphql(addBug)(ReportarBugs));