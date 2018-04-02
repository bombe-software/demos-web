import React, { Component } from 'react';
import { Pie, Bar, Line, Polar } from 'react-chartjs-2';
import { compose, graphql } from 'react-apollo';
import _ from "lodash";
import { Link } from "react-router-dom";
import fetchGraficas from "./../../queries/fetchGraficas";
import fetchUsuario from "./../../queries/fetchUsuario";
import eleccion from "../../queries/fetchVotacionEstado";
import candidatosEstado from "../../queries/fetchCandidatosEstado";

class Graficas extends Component {

    constructor(props) {
        super(props);
    }
    //Generate Data Method...    
    generateData(names) {
        let {usuario} = this.props;
        let id_estado

        return {
            labels: names,
            datasets: [{
                data: [500, 230, 140],
                backgroundColor: [
                    'rgba(69, 196, 158, 0.8)',
                    'rgba(115, 86, 201, 0.8)',
                    'rgba(234, 83, 136, 0.8)',
                    'rgba(117, 97, 206, 0.8)',
                    'rgba(226, 89, 161, 0.8)',
                    'rgba(80,201, 164, 0.8)',
                    'rgba(209, 186, 9, 0.8)',
                    'rgba(89, 186,  8, 0.8)',
                    'rgba(209, 110,  9, 0.8)',

                ],
                hoverBackgroundColor: [
                    'rgba(69, 196, 158, 1)',
                    'rgba(115, 86, 201, 1)',
                    'rgba(234, 83, 136, 1)',
                    'rgba(117, 97, 206, 1)',
                    'rgba(226, 89, 161, 1)',
                    'rgba( 80,201, 164, 1)',
                    'rgba(209, 186, 9, 1)',
                    'rgba(89, 186,  8, 1)',
                    'rgba(209, 110,  9, 1)',
                ]
            }]
        };
    }

    renderMenu() {
        return (
            <div>
            <div className="columns is-desktop">

                <div className="column is-12-tablet is-4-desktop">
                    <Link to="/elecciones">
                        <div className="card hover-hero">
                            <div className="hero is-primary hover-hero">
                                <div className="hero-body">
                                    <h2 className="title">Elecciones</h2>
                                    <p className="subtitle">Consulta la posición de los candidatos de tu interés</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>


                <div className="column is-12-tablet is-4-desktop">
                    <Link to="/politicos">
                        <div className="card hover-hero">
                            <div className="hero is-info hover-hero">
                                <div className="hero-body">
                                    <h2 className="title">Políticos</h2>
                                    <p className="subtitle">Consulta las propuestas e historial de candidatos</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="column is-12-tablet is-4-desktop">
                    <Link to="/nacional">
                        <div className="card hover-hero">
                            <div className="hero is-danger hover-hero">
                                <div className="hero-body">
                                    <h2 className="title">Nacional</h2>
                                    <p className="subtitle">Ve la encuesta nacional por estado en un mapa interactivo</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
            </div>
        );
    }

    renderEncuestas(){
        if (this.props.fetchEleccion.loading || this.props.fetchUsuario.loading) return <div>Loading</div>
        if (this.props.fetchEleccion.votacion == undefined || JSON.stringify(this.props.fetchEleccion.votacion) == '[]' || JSON.stringify(this.props.fetchEleccion.votacion) == '{}') {
            return (
                <div>
                    <h2 className="is-size-3 title">Encuesta de {this.props.usuario.localidad.nombre}</h2>
                    <div className="hero">
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
                        <h2 className="is-size-3 title">Encuesta de {this.props.usuario.localidad.nombre}</h2>
                        <div className="hero">
                            <div className="hero-body">
                                <h3>Todavia no elaboramos la eleccion espera unas horas</h3>
                            </div>
                        </div>
                    </div>
                );
            } else {
                const votacion = this.props.fetchEleccion.votacion.preferencias;

                let backgroundColor = [
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
                let hoverBackgroundColor = [
                    'rgba(69, 196, 158, 1)',
                    'rgba(115, 86, 201, 1)',
                    'rgba(234, 83, 136, 1)',
                    'rgba(117, 97, 206, 1)',
                    'rgba(226, 89, 161, 1)',
                    'rgba( 80,201, 164, 1)',
                    'rgba(209, 186, 9, 1)',
                    'rgba(89, 186,  8, 1)',
                    'rgba(209, 110,  9, 1)',
                ]

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
                    <div className="section">
                    <div className="columns mobile">
                        <div className="column is-10-widescreen is-10-desktop is-8-fullhd is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                        <h2 className="is-size-3 title">Encuesta de {this.props.usuario.localidad.nombre}</h2>
                        <br />

                        <div className="title">
                            {this.props.usuario.localidad.nombre}
                        </div>
                        <div className="hero is-small">
                            <div className="hero-body">
                                <Pie data={data} />
                            </div>
                        </div>
                    
                        <br />

                        </div>
                    </div>

                </div>
                    
                )
                /*
                <Pie data={this.generateData(partidos)} />
                <Bar data={this.generateData(partidos)} />
                <Line data={this.generateData(partidos)} />
                <Polar data={this.generateData(partidos)} />
                */
            
            }
        }
    }

    renderInfoEstado() {
        console.log(this.props);
        return(
            <div>
                <div className="columns is-desktop">
                <div className="column is-12-tablet is-6-desktop">
                    <h2 className="is-size-3 title">Candidatos de tu región</h2>
                    {this.renderListPoliticos()}
                </div>
                <div className="column is-12-tablet is-6-desktop">
                    <h2 className="is-size-3 title">Propuestas populares</h2>
                    {this.renderTopPropuestas()}
                </div>
                </div>
            </div>
        );
    }

    renderListPoliticos() {
        if (this.props.fetchCandidatosEstado.loading || this.props.fetchUsuario.loading) return <div>Cargando...</div>
        let {candidatos} = this.props.fetchCandidatosEstado.estado;
        if(candidatos.length === 0){
            return (
                <div className="card">
                    <div className="card-content">
                    No hay candidatos en tu estado
                    </div>
                </div>
            );
        }
        return candidatos.map(({ id, nombre, partido }) => {
          
            return (
                <div key={id}>
                <Link to={'/politico/' + id} >
                    <div className="card">
                    <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                        <figure className="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                        </figure>
                        </div>
                        <div className="media-content">
                        <p className="title is-4">{nombre}</p>
                        <p className="subtitle is-6">{partido.nombre}</p>
                        </div>
                    </div>
                    </div>
                    </div>
                </Link>
                </div>
            );
        });
          
    };

    renderTopPropuestas() {
        let {propuestas} = this.props.fetchGraficas;
        let {usuario} = this.props;
        let propuestasEstado = [];

        if(this.props.fetchGraficas.loading){
            return <div>Cargando...</div>
        }

        if(propuestas.length === 0){
            return <div>No hay propuestas en tu estado</div>
        }

        _.map(propuestas, function(propuesta){
            console.log(propuesta);
            if(propuesta.politico){
                if(propuesta.politico.estado.id === usuario.localidad.id){
                    propuestasEstado.push(propuesta);
                }
            }
        });

        propuestasEstado.sort(function(a, b){
            return a.likes.length - b.likes.length;
        });

        var topPropuestas = propuestasEstado.slice(0,3).map((item)=>{
            return (
                <div className="card" key={item.id}>
                    <div className="card-content">
                        <h4>{item.titulo}</h4>
                        <p>{item.likes.length}</p>
                        <p>{item.politico.nombre}</p>
                    </div>
                </div>
            );
        });

        return(
            <div>
                {topPropuestas}
            </div>
        );
    };

    render() {
        return (
            <div className="section">
                <div className="columns is-desktop">
                    <div className="column is-10-widescreen is-10-desktop is-8-fullhd is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                        <h1 className="is-size-2 title">Inicio</h1>
                        {this.renderEncuestas()}
                        <br />
                        {this.renderMenu()}
                        <br /><br />
                        {this.renderInfoEstado()}
                    </div>
                </div>
            </div>
        );
    }

}
export default compose(
    graphql(fetchGraficas, {
        name: 'fetchGraficas'
    }),
    graphql(fetchUsuario, {
      name: 'fetchUsuario'
    }),
    graphql(eleccion, {
        name: 'fetchEleccion',
        options: ({ id_estado }) => ({ variables: { id_estado } }),
    }),
    graphql(candidatosEstado, {
        name: 'fetchCandidatosEstado',
        options: ({ id_estado }) => ({ variables: { id_estado } }),
    }),
)(Graficas);