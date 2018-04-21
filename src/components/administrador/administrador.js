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
        this.state = { type: 'bus' };
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
            <div>
                Administrador
                <a onClick={()=>this.update('logs')}>Logs</a>
                <a onClick={()=>this.update('bugs')}>Bugs</a>
                <a onClick={()=>this.update('lista_usuarios')}>Eliminar usuarios</a>
                {this.renderSection(this.state.type)}
            </div>
        );
    }
}

export default graphql(fetchUsuario, { name: 'fetchUsuario' })(Administrador)