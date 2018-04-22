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
        if(list.length===0){
            return(<div>Sin resultados</div>);
        }
        return _.map(list, o => {
            return (
                <div key={o.id}>
                    <p>
                        {o.titulo}
                    </p>
                </div>
            );
        });
    }
    render() {
        if(this.props.data.loading) return 'Loading..';
        if(this.props.busqueda == '') return 'No has buscado nada'
        return (
            <div className="has-text-centered">
                {this.renderList(this.props.busqueda)}
            </div>
        )
    }
}

export default graphql(fetchPropuestas)(Propuestas);
