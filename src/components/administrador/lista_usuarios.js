import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchUsuariosAdmin from './../../queries/fetchUsuariosAdmin';

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

    renderList(list){
        return _.map(list, o => {
            let color = o.tipo_usuario.tipo === "Moderador" ? "secondary": "primary";
            return (  
                <div key={o.id}>
                    <tr className="full-width-row">
                        <td>
                            <figure className="image is-32x32">
                            <img src={`./assets/img/${o.avatar}.svg`} alt="Avatar de usuario" />
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
                            <button className="button is-danger">
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </button>
                        </td>
                    </tr>
                </div>
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
                    <div>
                        {this.renderList(this.props.data.usuarios)}
                    </div>
                </table>
            </div>
        );
    }
}

export default graphql(fetchUsuariosAdmin)(ListaUsuarios)