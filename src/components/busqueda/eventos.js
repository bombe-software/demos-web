import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import fetchEventos from './../../queries/eventos';

import { validadoAcentos } from './buscar';
import CardEvento from  './../reutilizables/cards/card_evento';


class Eventos extends Component {

    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    renderList(param) {
        const string = validadoAcentos(param.toLowerCase());
        var re = new RegExp('^(.*?(\string\b)[^$]*)$');
        let list = _.filter(this.props.data.eventos, (o) =>{
            return re.test(validadoAcentos(o.titulo.toLowerCase())) || re.test(validadoAcentos(o.descripcion.toLowerCase()));
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
