import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchEventos from './../../queries/fetchEventos';

import {validadoAcentos} from './buscar';
import CardEvento from '../generic/CardEvento';

class Eventos extends Component {

    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    renderList(param) {
        var re = new RegExp(param.toUpperCase());
        let list = _.filter(this.props.data.eventos, (o) =>{
            return re.test(validadoAcentos(o.titulo.toUpperCase()))||re.test(validadoAcentos(o.descripcion.toUpperCase()));
        });
        if(list.length===0){
            return(<div>Sin resultados</div>);
        }
        return _.map(list, o => {
            return (
                <div key={o.id}>
                    <CardEvento o={o} politico />
                </div>
            );
        });
    }

    render() {
        if (this.props.data.loading) return 'Loading..';
        if (this.props.busqueda == '') return 'No has buscado nada'
        return (
            <div className="has-text-centered">
                {this.renderList(this.props.busqueda)}
            </div>
        )
    }
}

export default graphql(fetchEventos)(Eventos);
