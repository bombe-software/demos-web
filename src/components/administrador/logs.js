import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchLogs from './../../queries/fetchLogs';

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
                        {o.id}
                    </td>
                </tr>
            );
        });
    }

    render() {
        if (this.props.data.loading) {
            <h1 className="is-size-3 subtitle">Registros</h1>
            return <div>Loading...</div>
        }
        return (
            <div>
                <h1 className="is-size-3 subtitle">Registros</h1>
                <h1 className="is-size-3 subtitle">Registros</h1>
                <table className="table full-width-row is-fullwidth">
                    <tbody>
                        {this.renderList(this.props.data.logs)}
                    </ tbody>
                </table>
            </div>
        );
    }
}

export default graphql(fetchLogs)(Logs)