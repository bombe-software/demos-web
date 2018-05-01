import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';

import Password from './password';
import Usuario from './usuario';
import Avatar from './avatar';

import usuario_in$acces from './../../../queries/usuario_in.access';
import usuario_in$navbar from './../../../queries/usuario_in.navbar';
import usuario_in$perfil from './../../../queries/usuario_in.perfil';

import update_usuario$nombre from './../../../mutations/update/usuario.config_cuenta.nombre';
import update_usuario$avatar from './../../../mutations/update/usuario.config_cuenta.avatar';
import update_usuario$password from './../../../mutations/update/usuario.config_cuenta.password';

class ConfigForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: 'jaiba',
            imgAvatar: ['selected', 'none', 'none', 'none'],
            errors: [],
            type: 'Usuario'
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderSection = this.renderSection.bind(this);
        this.updateUsuario = this.updateUsuario.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
    }

    handleSubmit(avatar, nombre, password) {
        if (nombre) {
            this.props.mutate_nombre({
                variables: {
                    nombre
                },
                refetchQueries: [
                    { query: usuario_in$acces },
                    { query: usuario_in$navbar },
                    { query: usuario_in$perfil }
                ]
            });
        } else if (password) {
            this.props.mutate_password({
                variables: {
                    password
                },
                refetchQueries: [
                    { query: usuario_in$acces },
                    { query: usuario_in$navbar },
                    { query: usuario_in$perfil }
                ]
            });
        } else if (avatar) {
            this.props.mutate_avatar({
                variables: {
                    avatar
                },
                refetchQueries: [
                    { query: usuario_in$acces },
                    { query: usuario_in$navbar },
                    { query: usuario_in$perfil }
                ]
            });
        }

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
        let { type } = this.state;
        let mutate = this.handleSubmit;
        if (type == "Usuario") {
            return (
                <div>
                    <Usuario
                        id={this.props.usuario}
                        mutate={mutate}
                    />
                </div>
            );
        } else if (type == "Password") {
            return (
                <div>
                    <Password
                        id={this.props.usuario}
                        mutate={mutate}
                    />
                </div>
            );
        } else if (type == "Avatar") {
            return (
                <div>
                    <Avatar
                        id={this.props.usuario}
                        mutate={mutate}
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
                <div className="tabs is-boxed">
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


export default compose(
    graphql(update_usuario$nombre, {
        name: 'mutate_nombre'
    }),
    graphql(update_usuario$password, {
        name: 'mutate_password'
    }),
    graphql(update_usuario$avatar, {
        name: 'mutate_avatar'
    })
)(ConfigForm);