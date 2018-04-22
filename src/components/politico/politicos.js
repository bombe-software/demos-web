import React, { Component } from "react";
import zonas from '../../queries/fetchZonas';
import { graphql } from 'react-apollo';
import PoliticoList from "./politico_list";
import { Link } from "react-router-dom";

class Politicos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_puesto: 0,
            id_estado: null,
            zona: '',
            estado: ''
        };
        this.updateSearch = this.updateSearch.bind(this);
    }
 
    updateSearch(id, tipo, estado,zona){
        return (()=>{
            this.setState({
                id_estado: id,
                id_puesto: tipo,
                estado,
                zona
            });
        })
        
    }

    getActivePuesto(i){
      if(i == this.state.id_puesto){
        return 'is-active';
      }
      return '';
    }

    getActiveEstado(i){
      if(i == this.state.id_estado){
        return 'is-active';
      }
      return '';
    }

    renderEstados() {
        return this.props.data.zonas.map(({ nombre, estados }) => { 
                return(
                    <div key={nombre}>
                            <li>
                            <details>
                                <summary>{nombre}</summary>
                                <ul>
                                {estados.map( estado => {
                                    return (    
                                        <li key={estado.id}>
                                            <a
                                            onClick={this.updateSearch(estado.id, this.state.id_puesto, estado.nombre,nombre)}
                                            className={this.getActiveEstado(estado.id)} >{estado.nombre}</a>
                                        </li>
                                    )
                                })}
                                </ul>
                            </details>
                            </li>
                        </div>
                );    
        });
        
    }
    renderCuandoNoHayEstado(){
        return(                            <div>
            <div className="card-image">
                <div className="hero is-light">
                    <div className="hero-body">
                        <h3>No has seleccionado ningún político</h3>
                    </div>
                </div>
            </div>
        </div>);
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
         if (this.props.data.loading){return <div>Loading...</div>}
        return (
            <div className="section">
              <div className="columns mobile">
              <div className="column is-10-widescreen is-10-desktop is-8-fullhd is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                    <h1 className="is-size-2 title">Políticos</h1>
                </div>
              </div>
              <div className="columns is-desktop">
              <div className="column is-3-desktop is-3-widescreen is-3-fullhd is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                    <aside className="menu">
                      <div>
                          <p className="menu-label">Tipo</p>
                          <ul className="menu-list-light">
                            <li>
                                <a onClick={this.updateSearch(this.state.id_estado, 0,this.state.estado,this.state.zona)} className={this.getActivePuesto(0)}>Candidato</a>
                            </li>
                            <li>
                                <a onClick={this.updateSearch(this.state.id_estado, 1,this.state.estado,this.state.zona)} className={this.getActivePuesto(1)}>Funcionario</a>
                            </li>
                          </ul>
                      </div>
                      <br />
                      <div>
                          <p className="menu-label">Region</p>
                          <ul className="menu-list-light">
                                {this.renderEstados()}
                          </ul>
                      </div>
                    </aside>
                  </div>
                  <div className="column is-7-desktop is-7-widescreen is-5-fullhd is-12-tablet is-12-mobile">
                    <div key={this.state.id_estado+this.state.id_puesto}> 
                        <div className="level">
                        <div className="level-left"></div>
                        <div className="level-right">
                            <div className="level-item">
                            <p className="has-text-right">
                                <Link to="/crear/politico" className="button is-success">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                                &nbsp;&nbsp;&nbsp;Agregar un político
                                </Link >
                            </p>
                            </div>
                        </div>
                        </div>
                          {(this.state.id_estado != null) ? <PoliticoList
                            id_estado = {this.state.id_estado}
                            estados = {this.state.estado}
                            zona = {this.state.zona}
                            id_puesto = {this.state.id_puesto}
                          /> : this.renderCuandoNoHayEstado() }
                    </div>
                  </div>
              </div>
            </div>
        )
    }
}
export default graphql(zonas)(Politicos);
