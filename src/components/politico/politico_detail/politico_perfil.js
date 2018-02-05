import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';

import fetchPoliticoPerfil from '../../../queries/fetchPoliticoPerfil';

class PoliticoPerfil extends Component {
    constructor(props) {
        super(props);
        let { id } = this.props;
        this.state = {
            id_politico: id
        };
    }

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

    render() {
        if (this.props.fetchPolitico.politicosPorId != undefined) {
            //let {politico} = this.props.fetchPolitico.politicosPorId;
            let politico, {nombre, partido, estudios} = this.props.fetchPolitico.politicosPorId;
            //if(politico, nombre, partido.nombre, estudios.grado_academico, estudios.titulo, estudios.lugar_estudio);
            return (
                <div>
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-1by1">
                                <img src="../../../assets/img/politico.png" />
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="is-size-5 has-text-centered">
                                <span>{nombre}</span>
                            </div>
                            <hr />
                            <span className="is-size-6">
                                <p>Partido: {partido.nombre}</p>
                                <p>Titulo: {estudios[0].titulo}</p>
                                <p>Grado academico: {estudios[0].grado_academico.grado}</p>
                                <p>Lugar de estudio: {estudios[0].lugar_estudio.nombre}</p>
                            </span>
                        </div>
                    </div>

                </div>
            );
        } else {
            return (
                <div>
                    <div className="spinner">
                    </div>
                </div>
            );
        }
    }
}

export default
    compose(
        graphql(fetchPoliticoPerfil, {
            name: 'fetchPolitico',
            options: (props) => { return { variables: { id: props.id } } }
        })
    )(PoliticoPerfil);
