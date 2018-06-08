import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import usuarios from './../../queries/usuarios';
import delete_usuario from './../../mutations/delete/usuario';

class ListaUsuarios extends Component {

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

    eliminarUsuario(id_usuario) {
        this.props.mutate({
            variables: { id_usuario },
            optimisticResponse: {
                __typename: "Mutation",
                delete_usuario: {
                    id: id_usuario,
                    __typename: "UsuarioType"
                }
            },
            update: (proxy, { data: { delete_usuario } }) => {
              const data = proxy.readQuery({ query: usuarios });
              _.remove(data.usuarios, function(n) {
                return n.id == id_usuario; 
              });
              proxy.writeQuery({ query: usuarios, data });
            }
        })
    }

    renderList(list) {
        let listFilter = _.filter(list, function (o) { return (o.tipo_usuario.tipo != "Administrador") });
        return _.map(listFilter, o => {
            let color = o.tipo_usuario.tipo === "Moderador" ? "secondary" : "primary";
            return (
                <tr className="full-width-row" key={o.id}>
                    <td>
                        <figure className="image is-32x32">
                            <img src={`./assets/img/${o.avatar}.png`} alt="Avatar de usuario" />
                        </figure>
                    </td>
                    <td>
                        <p className="title is-5">{o.nombre}</p>
                    </td>
                    <td >
                        <span className={`tag is-${color}`}>Tipo: {o.tipo_usuario.tipo}</span>
                    </td>
                    <td>
                        <span className="tag is-light">Puntos: {o.puntos}</span>
                    </td>
                    <td className="has-text-right">
                        <button className="button is-danger" onClick={() => this.eliminarUsuario(o.id)}>
                            <i className="fa fa-times" aria-hidden="true"></i>
                        </button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        if (this.props.data.loading) {
            return (<div>
                <h1 className="is-size-3 subtitle">Usuarios</h1>
                Loading...
                </div>);
        }
        return (
            <div>
                <h1 className="is-size-3 subtitle">Usuarios</h1>
                <table className="table full-width-row is-fullwidth">
                    <tbody>
                        {this.renderList(this.props.data.usuarios)}
                    </ tbody>
                </table>
            </div>
        );
    }
}

export default graphql(delete_usuario)(graphql(usuarios)(ListaUsuarios));