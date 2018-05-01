import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchPoliticos from './../../queries/politicos';

import {validadoAcentos} from './buscar';

import CardPolitico from './../reutilizables/cards/card_politico';

class Politicos extends Component {

    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    renderList(param) {

        var re = new RegExp(param.toUpperCase());
        
        let list = _.filter(this.props.data.politicos, (o) =>{
            return re.test(validadoAcentos(o.nombre.toUpperCase()));
        });


        if(list.length===0){
            return(<div>Sin resultados</div>);
        }
        return _.map(list, o => {
            return (
                <div key={o.id}>
                    <CardPolitico o={o} />
                </div>
            );
        });
    }

    render() {
        if (this.props.data.loading) return 'Loading..';
        if(this.props.busqueda == '') return 'No has buscado nada'
        return (
            <div className="has-text-centered">
                {this.renderList(this.props.busqueda)}
            </div>
        )
    }
}

export default graphql(fetchPoliticos)(Politicos);
