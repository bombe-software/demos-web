import React, { Component } from "react";
import { Doughnut } from 'react-chartjs';

import { graphql } from 'react-apollo';
import eleccion from "../../queries/fetchVotacionEstado";

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

    /*
    render() {

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

        _.mapValues(this.props.elecciones, function (eleccion) {
            labelsProps.push(eleccion.nombre);
            dataProps.push(eleccion.votos);
        });

        let data = {
            labels: labelsProps,
            datasets: [{
                data: dataProps,
                backgroundColor: colorList,
                hoverBackgroundColor: colorOpacityList
            }]
        };
    }
    */
    render() {
        if (JSON.stringify(this.props.data.votacion) == undefined || JSON.stringify(this.props.data.votacion) == '[]' || JSON.stringify(this.props.data.votacion) == '{}') {
            return (
                <div>
                    <div className="card-image">
                        <div className="hero is-light">
                            <div className="hero-body">
                                <h3>No hay elecciones para mostrar en esta región</h3>
                            </div>
                        </div>
                    </div>
                    <button className="button is-primary" onClick={this.props.handleForm}>
                        Contestar encuesta
                    </button>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="card-content">
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
                    </div>
                    <div className="card-image">
                        <div className="hero is-small">
                            <div className="hero-body">
                                {/*
                                    <Doughnut data={data} />
                                */}
                                Some more
                            </div>
                        </div>
                    </div>
                    <div className="card-content">
                        <br />
                        <button className="button is-primary" onClick={this.props.handleForm}>
                            Contestar encuesta
                        </button>
                    </div>
                </div>
            );
        }
    }
}

export default graphql(eleccion, {
    options: ({ id_estado }) => ({ variables: { estado: id_estado } }),
})(EleccionDetail);
