import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchPoliticos from './../../queries/fetchPoliticos';

import {validadoAcentos} from './buscar';

import CardPolitico from '../generic/CardPolitico';

class Politicos extends Component {

    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    renderList(param) {

        var re = new RegExp(param);
        
        let list = _.filter(this.props.data.politicos, (o) =>{
            return re.test(validadoAcentos(o.nombre));
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
