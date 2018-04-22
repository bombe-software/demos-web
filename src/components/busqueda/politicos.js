import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchPoliticos from './../../queries/fetchPoliticos';

class Politicos extends Component {

    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    renderList(param) {
        let list = _.filter(this.props.data.politicos, (o) =>{ 
            return (o.nombre == param);
        });
        return _.map(list, o => {
            return (
                <tr key={o.id}>
                    <td>
                        {o.id}
                    </ td>
                    <td>
                        {o.nombre}
                    </ td>
                    <td>
                        {o.cargo}
                    </td>
                </tr>
            );
        });
    }

    render() {
        if (this.props.data.loading) return 'Loading..';
        if(this.props.busqueda == '') return 'No has buscado nada'
        return (
            <div>
                Politicos
                <table >
                    <tbody>
                        {this.renderList(this.props.busqueda)}
                    </ tbody>
                </table>
            </div>
        )
    }
}

export default graphql(fetchPoliticos)(Politicos);
