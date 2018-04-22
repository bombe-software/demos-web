import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchPropuestas from './../../queries/fetchPropuestas';

class Propuestas extends Component {

    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    renderList(param) {
        let list = _.filter(this.props.data.propuestas, (o) =>{ 
            return (o.titulo == param);
        });
        return _.map(list, o => {
            return (
                <tr key={o.id}>
                    <td>
                        {o.id}
                    </td>
                    <td>
                        {o.titulo}
                    </td>
                </tr>
            );
        });
    }
    render() {
        if(this.props.data.loading) return 'Loading..';
        if(this.props.busqueda == '') return 'No has buscado nada'
        return (
            <div>
                Propuestas
                <table >
                    <tbody>
                        {this.renderList(this.props.busqueda)}
                    </ tbody>
                </table>
            </div>
        )
    }
}

export default graphql(fetchPropuestas)(Propuestas);
