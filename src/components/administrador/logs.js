import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import logs from './../../queries/logs';

class Logs extends Component {

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

    renderList(list) {
        return _.map(list, o => {
            return (
                <tr className="full-width-row" key={o.id}>
                    <td>
                        {o.ip}
                    </td>
                    <td>
                        {o.metodo}
                    </td>
                    <td>
                    {o.usuario ? o.usuario.nombre: ''}
                    </td>
                    <td>
                        {o.query}
                    </td>
                </tr>
            );
        });
    }

    render() {
        if (this.props.data.loading) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h1 className="is-size-3 subtitle">Registros</h1>
                <table className="table full-width-row is-fullwidth">
                    <thead>
                        <tr>
                        <th>IP</th>
                        <th>Mètodo</th>
                        <th>Consulta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList(this.props.data.logs)}
                    </ tbody>
                </table>
            </div>
        );
    }
}

export default graphql(logs)(Logs)