import Navbar from "./../generic/navbar";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Doughnut, Bar, Line, Pie } from 'react-chartjs-2';
import { graphql } from 'react-apollo';
import usuario from "./../../queries/fetchUsuario";
import Graficas from './graficas';

class LandingPage extends Component {

    constructor(props) {
        super(props);
    }

    generateData(names) {
        return {
            labels: names,
            datasets: [{
                data: [120, 230, 140, 300, 0],
                backgroundColor: [
                    'rgba(69, 196, 158, 0.9)',
                    'rgba(115, 86, 201, 0.9)',
                    'rgba(234, 83, 136, 0.9)'
                ],
                hoverBackgroundColor: [
                    'rgba(69, 196, 158, 1)',
                    'rgba(115, 86, 201, 1)',
                    'rgba(234, 83, 136, 1)'
                ]
            }]
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
        if(this.props.data.loading)  return <div></div>
        let {usuario} = this.props.data;
        console.log(usuario);
        if(usuario != null)  return <Graficas usuario={usuario} id_estado={usuario.localidad.id}/>
        let names = [
            'Jesús Medina',
            'Mariana Benítez',
            'Juan Pérez'
        ];

        let categories = [
            'Seguridad',
            'Recreación',
            'Salud'
        ];

        let estados = [
            'CDMX',
            'Vecacruz',
            'Hidalgo',
            'Estado de México'
        ];

        let partidos = [
            'PRI',
            'PAN',
            'PRD',
            'MORENA'
        ];


        return (
            <div>
                <div className="hero is-medium is-dark">
                    <div className="hero-image img-1">

                        <div className="hero-body">
                            <div className="container">
                                <p className="is-size-1 title">Bienvenido a Demos</p>
                                <p className="subtitle">Decide por quien votar informándote de las propuestas y el historial de cada político</p>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="hero is-medium is-light">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns">
                                <div className="column has-text-left">
                                    <p className="is-size-1">Un pueblo tiene al líder que merece...</p>
                                    <p className="is-size-5">
                                        Demos fue creado para informar con datos proporcionados
                                        por la misma población a través de <strong>crowdsourcing</strong>,
                                        que nos permite recaudar la mayor cantidad de información y filtrar
                                        la que no es relevante.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero is-medium">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns">
                                <div className="column">
                                    <p className="is-size-1">Demos es acerca de información, y la mostramos así:</p>
                                </div>
                            </div>
                            <br /><br />
                            <div className="columns">
                                <div className="column is-4">
                                    <p className="is-size-3">Tendencias en categorias de propuestas</p>
                                </div>
                                <div className="column is-8">
                                    
                                    <Bar data={this.generateData(categories)} />
                                   
                                </div>
                            </div>
                            <br /><br />
                            <div className="columns">
                                <div className="column is-8">
                                    {
                                    <Line data={this.generateData(estados)} />
                                    }
                                </div>
                                <div className="column is-4">
                                    <p className="is-size-3">Estados más participativos</p>
                                </div>
                            </div>
                            <br /><br />
                            <div className="columns">
                                <div className="column is-4">
                                    <p className="is-size-3">Tendencia de preferencias por partido</p>
                                </div>
                                <div className="column is-8">
                                    {
                                    <Pie data={this.generateData(partidos)} />
                                     }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="hero is-small is-light">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns">
                                <div className="column has-text-centered">
                                    <br />
                                    <p className="is-size-1">Investiga a fondo a cada político</p>
                                </div>
                            </div>
                        </div>
                        <br /><br />
                        <div className="container">
                            <div className="columns">
                                <div className="column is-3 has-text-centered">
                                    <img className="is-squared" src="../assets/img/politician.png" alt="Político" />
                                </div>
                                <div className="column is-8  is-offset-1 has-text-left">
                                    <p className="is-size-2">Propuestas</p>
                                    <p className="is-size-5">
                                        Enlista todos las propuestas que el político ha realizado
                                        durante su campaña
                                    </p>
                                    <br />
                                    <p className="is-size-2">Historial</p>
                                    <p className="is-size-5 ">
                                        Navega a través de una línea del tiempo que recuenta
                                        todos los hechos y eventos importantes de la carrera
                                        del político
                                    </p>
                                </div>

                            </div>
                        </div>
                        <br /><br />
                    </div>
                </div>


                <div className="hero is-medium">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-desktop">
                                <div className="column is-4-desktop is-12-tablet">
                                    <p className="is-size-1">Estadísticas en tiempo real</p>
                                    <hr />
                                    <p className="is-size-4">
                                        Visualiza los datos de las encuestas realizadas por la
                      comunidad y brinda anónimamente tu opinión
                    </p>
                                </div>
                                <br /><br /><br />
                                <div className="column is-8-desktop is-12-tablet">
                                    <Doughnut data={this.generateData(names)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hero is-light">
                    <div className="hero-body">
                        <div className="container">

                            <div className="columns is-desktop">
                                <div className="column">
                                    <h1 className="is-size-2">Accede a nuestros servicios</h1>
                                    <hr />
                                </div>
                            </div>

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
                                <Link to="/soporte">
                                    <div className="card hover-hero">
                                        <div className="hero is-danger hover-hero">
                                            <div className="hero-body">
                                                <h2 className="title">Soporte</h2>
                                                <p className="subtitle">Obtén ayuda de algún administrador del programa</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default graphql(usuario)(LandingPage);
