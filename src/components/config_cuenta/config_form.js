import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import updateUsuario from '../../queries/updateUsuario';
import Password from './password';
import Usuario from './usuario';
import Avatar from './avatar';

import { Form, Field } from "react-final-form";
import GenericForm from './../generic/generic_form';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

class ConfigForm extends GenericForm {
    constructor(props) {
        super(props);
        this.state = {
            avatar: 'jaiba',
            imgAvatar: ['selected', 'none', 'none', 'none'],
            errors: []
        };
        this.setState = this.setState.bind(this);
        this.state = { type: 'Usuario' };
        this.updateUsuario = this.updateUsuario.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
        this.renderSection = this.renderSection.bind(this);
    }
    updateUsuario() {
        this.setState({ type: 'Usuario' })
    }
    updatePassword() {
        this.setState({ type: 'Password' })
    }
    updateAvatar() {
        this.setState({ type: 'Avatar' })
    }
    renderSection() {

        let {type} = this.state;
        if (type == "Usuario") {
            return (
                <div>
                    <Usuario
                        id={this.props.usuario.id}
                        mutate={this.props.mutate}
                        avatar={this.props.usuario.avatar}
                        password={this.props.usuario.password}
                    />
                </div>
            );
        } else if (type == "Password") {
            return (
                <div>
                    <Password
                        id={this.props.usuario.id}
                        mutate={this.props.mutate}
                        avatar={this.props.usuario.avatar}
                        nombre={this.props.usuario.nombre}
                    />
                </div>
            );
        } else if (type == "Avatar") {
            return (
                <div>
                    <Avatar
                        id={this.props.usuario.id}
                        mutate={this.props.mutate}
                        nombre={this.props.usuario.nombre}
                        password={this.props.usuario.password}
                    />
                </div>
            );
        }
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
        return (
            <div>
                <div className="tabs is-medium is-boxed">
                    <ul>
                        <li className={this.state.type == "Usuario" ? 'is-active' : ''}>
                            <a onClick={this.updateUsuario}>
                                <span className="icon is-small">
                                    <i className="fa fa-user" aria-hidden="true"></i>
                                </span>
                                <span>&nbsp;Usuario</span>
                            </a>
                        </li>
                        <li className={this.state.type == "Password" ? 'is-active' : ''}>
                            <a onClick={this.updatePassword}>
                                <span className="icon is-small">
                                    <i className="fa fa-key" aria-hidden="true"></i>
                                </span>
                                <span>&nbsp;Password</span>
                            </a>
                        </li>
                        <li className={this.state.type == "Avatar" ? 'is-active' : ''}>
                            <a onClick={this.updateAvatar}>
                                <span className="icon is-small">
                                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                                </span>
                                <span>&nbsp;Avatar</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    {this.renderSection()}
                </div>
            </div>

        )
    }
}


export default graphql(updateUsuario)(ConfigForm)