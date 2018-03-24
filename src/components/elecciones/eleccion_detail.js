import React, { Component } from "react";
import { Doughnut } from 'react-chartjs-2';
import _ from "lodash";

import { graphql, compose } from 'react-apollo';
import eleccion from "../../queries/fetchVotacionEstado";
import usuario from "../../queries/fetchUsuario";

class EleccionDetail extends Component {
    constructor(props) {
        super(props);
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
        if (this.props.fetchEleccion.loading || this.props.fetchUsuario.loading) return <div>Loading</div>
        if (this.props.fetchEleccion.votacion == undefined || JSON.stringify(this.props.fetchEleccion.votacion) == '[]' || JSON.stringify(this.props.fetchEleccion.votacion) == '{}') {
            return (
                <div>
                    <div className="hero is-light">
                        <div className="hero-body">
                            <h3>No hay elecciones para mostrar en esta región</h3>
                        </div>
                    </div>
                </div>
            );
        } else {
            if (this.props.fetchEleccion.votacion.preferencias.length <= 0) {
                return (
                    <div>
                        <div className="hero is-light">
                            <div className="hero-body">
                                <h3>Todavia no elaboramos la eleccion espera unas horas</h3>
                            </div>
                        </div>
                        {(() => {
                                if (this.props.fetchUsuario.usuario != undefined) return (
                                    <button className="button is-primary" onClick={this.props.handleForm}>
                                        Contestar encuesta
                                </button>
                                )
                        })()}
                    </div>
                );
            } else {
                const votacion = this.props.fetchEleccion.votacion.preferencias;
                let colorList = [
                    'rgba(69, 196, 158, 0.9)',
                    'rgba(115, 86, 201, 0.9)',
                    'rgba(234, 83, 136, 0.9)',
                    'rgba(37, 185, 140, 0.9)',
                    'rgba(230, 46, 111, 0.9)',
                    'rgba(89, 55, 191, 0.9)'
                ];

                let colorOpacityList = [
                    'rgba(69, 196, 158, 1)',
                    'rgba(115, 86, 201, 1)',
                    'rgba(234, 83, 136, 1)',
                    'rgba(37, 185, 140, 1)',
                    'rgba(230, 46, 111, 1)',
                    'rgba(89, 55, 191, 1)'
                ];
                let labelsProps = [];
                let dataProps = [];

                _.mapValues(votacion, function (preferencia) {
                    labelsProps.push(preferencia.politico.nombre);
                    dataProps.push(preferencia.usuarios.length);
                });

                let data = {
                    labels: labelsProps,
                    datasets: [{
                        data: dataProps,
                        backgroundColor: colorList,
                        hoverBackgroundColor: colorOpacityList
                    }]
                };
                return (
                    <div>
                        <div className="title">
                            <nav className="breadcrumb" aria-label="breadcrumbs">
                                <ul>
                                    <React.Fragment>
                                        <li><a href="#" >Estatal</a></li>
                                        <li><a href="#" >{this.props.zona}</a></li>
                                        <li key><a href="#" >{this.props.estado}</a></li>
                                    </React.Fragment>
                                </ul>
                            </nav>
                        </div>
                        <div className="hero is-small">
                            <div className="hero-body">
                                <Doughnut data={data} />
                            </div>
                        </div>
                    
                        <br />
                        {(() => {
                            if (this.props.fetchUsuario.usuario != undefined) return (
                                <button className="button is-primary" onClick={this.props.handleForm}>
                                    Contestar encuesta
                            </button>
                            )
                        })()}
                        
                    </div>
                );
            }
        }
    }
}
export default compose(
    graphql(usuario, {
        name: 'fetchUsuario'
    }),
    graphql(eleccion, {
        name: 'fetchEleccion',
        options: ({ id_estado }) => ({ variables: { id_estado } }),
    })
)(EleccionDetail);
