import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import fetchPropuestas from './../../queries/propuestas';

import {validadoAcentos} from './buscar';
import CardPropuesta from './../reutilizables/cards/card_propuesta';

class Propuestas extends Component {

    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    renderList(param) {
        var re = new RegExp(param.toUpperCase());
        let list = _.filter(this.props.data.propuestas, (o) =>{
            return re.test(validadoAcentos(o.titulo.toUpperCase()))||re.test(validadoAcentos(o.descripcion.toUpperCase()));
        });
        if(list.length===0){
            return(<div>Sin resultados</div>);
        }
        return _.map(list, o => {
            return (
                <div key={o.id}>
                    <CardPropuesta o={o} politico />
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
