import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchUsuario from './../../queries/fetchUsuario';
import NotFound from './../../components/not_found';

import Logs from './logs';
import Bugs from './bugs';
import ListaUsuarios from './lista_usuarios';


class Administrador extends Component {
    constructor(props) {
        super(props);
        this.state = { type: 'bugs' };
        this.update = this.update.bind(this);
    }

    update(type) {
        this.setState({ type });
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

    renderSection(type) {
        if (type == "bugs") {
            return <Bugs />;
        } else if (type == "logs") {
            return <Logs />;
        } else if (type == "lista_usuarios") {
            return <ListaUsuarios />;
        }
    }

    render() {
        if (this.props.fetchUsuario.loading) {
            return <div>Loading...</div>
        }
        if (!this.props.fetchUsuario.usuario || this.props.fetchUsuario.usuario.tipo_usuario.tipo != "Administrador") {
            return (
                <NotFound />
            );
        }
        return (
            <div className="section">
                <div className="columns">
                <div className="column is-10-widescreen is-10-desktop is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                    <h1 className="is-size-2 title">Administrador</h1>
                </div>
                </div>
                <div className="columns is-desktop">
                    <div className="column is-10-widescreen is-10-desktop is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                        
                        <div className="tabs">
                            <ul>
                                <li className={`${this.state.type === "bugs" ? "is-active" : ""}`}>
                                    <a onClick={()=>this.update('bugs')}>
                                    <span className="icon is-small"><i className="fa fa-bug" aria-hidden="true"></i></span>
                                    &nbsp;<span>Bugs</span>
                                    </a>
                                </li>

                                <li className={`${this.state.type === "logs" ? "is-active" : ""}`}>
                                    <a onClick={()=>this.update('logs')}>
                                    <span className="icon is-small"><i className="fa fa-list" aria-hidden="true"></i></span>
                                    &nbsp;<span>Registros</span>
                                    </a>
                                </li>

                                <li className={`${this.state.type === "lista_usuarios" ? "is-active" : ""}`}>
                                    <a onClick={()=>this.update('lista_usuarios')}>
                                    <span className="icon is-small"><i className="fa fa-user" aria-hidden="true"></i></span>
                                    &nbsp;<span>Usuarios</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {this.renderSection(this.state.type)}
                    </div>
                </div>
            </div>
        );
    }
}

export default graphql(fetchUsuario, { name: 'fetchUsuario' })(Administrador)