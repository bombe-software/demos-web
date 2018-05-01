import React, { Component } from "react";
import { graphql } from 'react-apollo';

import Password from './password';
import Usuario from './usuario';
import Avatar from './avatar';

import usuario_in$acces from './../../../queries/usuario_in.acces';
import usuario_in$navbar from './../../../queries/usuario_in.navbar';
import update_usuario from './../../../mutations/update/usuario.config_cuenta';

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
        this.updateUsuario = this.updateUsuario.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.updateAvatar = this.updateAvatar.bind(this);
    }
    handleSubmit(id, avatar, nombre, password) {
        if(nombre){
            this.props.mutate({
                variables: {
                    id, nombre
                },
                refetchQueries: [
                    { query: usuario_in$acces },
                    { query: usuario_in$navbar }
                ]
            });
        }else if(password){
            this.props.mutate({
                variables: {
                    id, password
                },
                refetchQueries: [
                    { query: usuario_in$acces },
                    { query: usuario_in$navbar }
                ]
            });
        }else if(avatar){
            this.props.mutate({
                variables: {
                    id, avatar
                },
                refetchQueries: [
                    { query: usuario_in$acces },
                    { query: usuario_in$navbar }
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
        if (type == "Usuario") {
            return (
                <div>
                    <Usuario
                        id={this.props.usuario}
                        mutate={this.handleSubmit}
                    />
                </div>
            );
        } else if (type == "Password") {
            return (
                <div>
                    <Password
                        id={this.props.usuario}
                        mutate={this.handleSubmit}
                    />
                </div>
            );
        } else if (type == "Avatar") {
            return (
                <div>
                    <Avatar
                        id={this.props.usuario}
                        mutate={this.handleSubmite}
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


export default graphql(update_usuario)(ConfigForm);