import React, { Component } from "react";
import { Doughnut } from 'react-chartjs-2';
import _ from "lodash";
import LoadingScreen from '../reutilizables/loading_screen';
import { graphql } from 'react-apollo';
import eleccion from "../../queries/votacion_by_estado";

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
        if (this.props.data.loading) return <LoadingScreen />
        if (this.props.data.votacion == undefined || JSON.stringify(this.props.data.votacion) == '[]' || JSON.stringify(this.props.data.votacion) == '{}') {
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
            if (this.props.data.votacion.preferencias.length <= 0) {
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
                const votacion = this.props.data.votacion.preferencias;
                let colorList = [
                    'rgba(69, 196, 158, 0.8)',
                    'rgba(115, 86, 201, 0.8)',
                    'rgba(234, 83, 136, 0.8)',
                    'rgba(117, 97, 206, 0.8)',
                    'rgba(226, 89, 161, 0.8)',
                    'rgba(80,201, 164, 0.8)',
                    'rgba(209, 186, 9, 0.8)',
                    'rgba(89, 186,  8, 0.8)',
                    'rgba(209, 110,  9, 0.8)',
                ];

                let colorOpacityList = [
                    'rgba(69, 196, 158, 1)',
                    'rgba(115, 86, 201, 1)',
                    'rgba(234, 83, 136, 1)',
                    'rgba(117, 97, 206, 1)',
                    'rgba(226, 89, 161, 1)',
                    'rgba( 80,201, 164, 1)',
                    'rgba(209, 186, 9, 1)',
                    'rgba(89, 186,  8, 1)',
                    'rgba(209, 110,  9, 1)',
                ];
                let labelsProps = [];
                let dataProps = [];

                _.mapValues(votacion, function (preferencia) {
                    if(preferencia.politico){
                        labelsProps.push(preferencia.politico.nombre);
                        dataProps.push(preferencia.usuarios.length);
                    }
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
                            if (this.props.id_usuario != undefined) return (
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
export default graphql(eleccion)(EleccionDetail);
