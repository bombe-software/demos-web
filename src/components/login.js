import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { graphql } from 'react-apollo';

import login from "./../mutations/login";
import query from "./../queries/fetchUsuario";

import TextField from 'material-ui/TextField';

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
                                            <TextField
                                                onChange={event => { this.setState({ email: event.target.value }) }}
                                                value={this.state.email}
                                                errorText={this.state.errors["email"]}
                                                floatingLabelText="Email"
                                            />

                                        </div>
                                    </div>
                                    <div className="level">
                                        <div className="level-item">
                                            <TextField
                                                onChange={event => { this.setState({ password: event.target.value }) }}
                                                value={this.state.password}
                                                type="password"
                                                errorText={this.state.errors["password"]}
                                                floatingLabelText="Password"
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