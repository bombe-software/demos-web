import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { graphql } from 'react-apollo';

import login from "./../mutations/login";
import query from "./../queries/fetchUsuario";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            errors: []
        };
        this.setState = this.setState.bind(this);
        this.error = this.error.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    error(values) {
        const errors = [];
        //Poner validaciones

        this.setState({ errors });
    }

    onSubmit(){
        const {email, password} = this.state;
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).then(()=>  this.props.history.push("/"));
    }

    render() {
        return (
            <div>
                <section className="hero is-large">
                    <div className="section">
                        <div className="columns">
                            <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                                <div className="box"><h1 className="title is-3">Inicio de sesión</h1><hr />
                                    <div className="level">
                                        <div className="level-item">
                                            <Field
                                                changeState={event => { this.setState({ email: event.target.value }) }}
                                                mask={this.renderTextField}
                                                value={this.state.email}
                                                error={this.state.errors["email"]}
                                                placeholder={"Email"}
                                                label={"Escribe tu email"}
                                            />

                                        </div>
                                    </div>
                                    <div className="level">
                                        <div className="level-item">
                                            <Field
                                                changeState={event => { this.setState({ password: event.target.value }) }}
                                                mask={this.renderTextField}
                                                value={this.state.password}
                                                error={this.state.errors["password"]}
                                                placeholder={"Password"}
                                                label={"Escribe tu password"}
                                            />
                                        </div>
                                    </div>
                                    <div className="level">
                                        <div className="level-item">
                                            ¿Olvidaste tu contraseña? &nbsp; <Link to="/recover_pass" > Recuperar </Link>
                                        </div>
                                    </div>
                                    <div className="level">
                                        <div className="level-item">
                                            ¿No tienes una cuenta Demos? &nbsp; <Link to="/signin" > Registrate </Link>
                                        </div>
                                    </div>

                                    <div className="level">
                                        {this.state.mensaje}
                                        <div className="level-item has-text-centered">
                                            <button className="button is-primary" onClick={this.onSubmit}>
                                                Ingresar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default  graphql(query)(graphql(login)(Login));