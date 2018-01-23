import React, { Component } from "react";
import { compose } from 'react-apollo';
import { graphql } from 'react-apollo';
import fetchPoliticosDetail from '../../../queries/fetchPoliticoDetail';

class PoliticoDetail extends Component {
    constructor(props) {
        super(props);
        let { id } = this.props.match.params;
        this.state = {
            type: 'propuestas',
            id_politico: id
        };
        this.updatePropuestas = this.updatePropuestas.bind(this);
        this.updateHistorial = this.updateHistorial.bind(this);

        this.renderPerfil = this.renderPerfil.bind(this);
    }

    updatePropuestas() {
        this.setState({ type: 'propuestas' })
    }
    updateHistorial() {
        this.setState({ type: 'historial' })
    }

    renderSection() {
        if(this.props.politico != undefined){
            let {type} = this.state;
            if (type == "propuestas") {
                return (
                    <div>
                       
                    </div>
                );
            } else if (type == "historial") {
                return (
                    <div>
                       
                    </div>
                );
            }
        }else{
            return(
                    <div className="spinner"></div>
            );
        }
    }

    renderPerfil(){
        if(this.props.politico != undefined){
            let {politico} = this.props;
            return(
            <div>

                <div className="card">
                    <div className="card-image">
                      <figure className="image is-1by1">
                        <img src="../../../assets/img/politico.png" />
                      </figure>
                    </div>
                    <div className="card-content">
                        <div className="is-size-5 has-text-centered">
                            <span>{politico.nombre}</span>
                        </div>
                        <hr/>
                        <span className="is-size-6">
                        <p>Partido: {politico.partido}</p>
                          <p>Experiencia: {politico.fecha_incio_politica}</p>
                          <p>Slogan de campaña: {politico.motivacion}</p>
                      </span>
                    </div>
                </div>

        </div>
            );
        }else{
            return(
                <div>
                    <div className="spinner">
                    </div>
                </div>
            );
        }
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
        console.log(this.props);
        return (
            <div>
                <br/>
                        <div className="section">
                            <div className="columns is-desktop">
                                <div className="column is-3-fullhd is-4-widescreen is-3-desktop is-offset-1-desktop is-12-tablet is-12-mobile is-offset-2-fullhd">
                                {this.renderPerfil()}
                                </div>
                                <div className="column is-5-fullhd is-6-widescreen is-6-desktop is-12-tablet is-12-mobile">
                                    <div className="tabs is-medium is-boxed">
                                        <ul>
                                            <li className={this.state.type == "propuestas" ? 'is-active' : ''}>
                                                <a onClick={this.updatePropuestas}>
                                                  <span className="icon is-small">
                                                    <i className="fa fa-lightbulb-o" aria-hidden="true"></i>
                                                  </span>
                                                  <span>&nbsp;Propuestas</span>
                                                </a>
                                            </li>
                                            <li className={this.state.type == "historial" ? 'is-active' : ''}>
                                                <a onClick={this.updateHistorial}>
                                                  <span className="icon is-small">
                                                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                                                  </span>
                                                  <span>&nbsp;Historial</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        {this.renderSection()}
                                    </div>
                                </div>
                            </div>
                        </div>            
                <br/><br/>
            </div>

        )
    }
}

export default 
(graphql(fetchPoliticosDetail,
    {
      name: 'fetchPoliticoDetail'
    })
)(PoliticoDetail);
