import _ from "lodash";
import React, { Component } from "react";
import fetchZonas from '../../queries/fetchZonas';
import { compose } from 'react-apollo';
import { graphql } from 'react-apollo';
import { Link } from "react-router-dom";
import PoliticoList from "./PoliticoList";

class Politicos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id_puesto: 0,
            id_estado: 33,
            zona: '',
            estado: ''
        };
        this.updateSearch = this.updateSearch.bind(this);
    }
 
    updateSearch(id, tipo, estado,zona){
       // console.log(this.state)
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
        return this.props.fetchZonas.zonas.map(({ zona,estados }) => {
            return(
                <div key={zona}>
                        <li>
                        <details>
                            <summary>{zona}</summary>
                            <ul>
                            {estados.map(({ id,estado }) => {
                                return (
                                    <li key={id}>
                                        <a
                                        onClick={this.updateSearch(id, this.state.id_puesto, estado,zona)}
                                        className={this.getActiveEstado(id)} >{estado}</a>
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
         if (this.props.fetchZonas.loading){return <div>Loading...</div>}
         
        return (
            <div className="section">
              <div className="columns mobile">
                <div className="column is-offset-1-tablet is-offset-1-mobile is-offset-2-desktop is-10-mobile is-10-tablet is-8-desktop">
                <h1 className="is-size-2">Políticos</h1>
                <hr />
                </div>
              </div>
              <div className="columns mobile">
                  <div className="column is-2-desktop is-offset-2-desktop is-4-tablet is-offset-1-tablet is-10-mobile is-offset-1-mobile">
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
                                <li>
                                  <div>
                                      <a onClick={this.updateSearch(33, this.state.id_puesto)} className={this.getActiveEstado(33)}>Nacional</a>
                                  </div>
                                </li>
                                {this.renderEstados()}
                          </ul>
                      </div>
                    </aside>
                  </div>
                  <div className="column is-6-desktop is-10-mobile is-offset-1-mobile is-6-tablet">
                    <div key={this.state.id_estado+this.state.id_puesto}>
                        <PoliticoList
                            id_estado = {this.state.id_estado}
                            estados = {this.state.estado}
                            zona = {this.state.zona}
                            id_puesto = {this.state.id_puesto}
                          />
                    </div>
                  </div>
              </div>
            </div>
        )
    }
}

export default compose(
graphql(fetchZonas,
    {
      name: 'fetchZonas'
    })
)(Politicos);