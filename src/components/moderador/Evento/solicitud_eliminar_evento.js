import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudEvento from '../../../queries/fetchSolicitudEventoElim';

import AceptarEvento from '../../../queries/AceptarEliminarEvento'
import DenegarEvento from '../../../queries/DenegarEliminarEvento';

import DetalleEliminarEvento from './detalle_eliminar_evento';

class SolicitudEliminarEvento extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      idEvento: null,
    }

    this.aceptar = this.aceptar.bind(this);
    this.denegar = this.denegar.bind(this);
    this.seleccionar = this.seleccionar.bind(this);
    this.setState = this.setState.bind(this);
  }

  aceptar(id_solicitud) {
    this.setState({ idEvento: null });
    this.props.AceptarEvento({
      variables: {
       id_solicitud
      }
    }).then(()=> this.props.fetchSolicitudEvento.refetch());
  }

  denegar(id_solicitud) {
    this.setState({ idEvento: null });
    this.props.DenegarEvento({
      variables: {
        id_solicitud
      }
    }).then(()=> this.props.fetchSolicitudEvento.refetch());
  }

  seleccionar(idEvento) {
    this.setState({ idEvento });
  }

  renderList() {
    return this.props.fetchSolicitudEvento.solicitudesDeleteEvento.map(({id,id_evento, id_usuario}) => {
      return (
        <div key={id}>
          <div className="panel-block" >
            <span className="panel-icon">
              <a className="is-primary" onClick={() => { this.aceptar(id) }}>
                <i className="fa fa-check"></i>
              </a> &nbsp;&nbsp;&nbsp;
            </span>
            <span className="panel-icon">
              <a className="is-danger" style={{ color: 'red' }} onClick={() => { this.denegar(id) }}>
                <i className="fa fa-times"></i>
              </a>
            </span>
            <a  onClick={()=>{this.seleccionar(id)}}
            style={{color: 'inherit', textDecoration: 'none'}}
            >{id_evento.titulo}</a>
          </div>
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
    if (this.props.fetchSolicitudEvento.loading){
      return <div>Loading...</div>
    }
    return (
      <div className="columns is-desktop">
        <div className="column is-5-widescreen is-4-desktop is-12-tablet">
          <div>
            
          <div className="panel">
            <div className="panel-heading">Eventos</div>
            {this.renderList()}
          </div>

          </div>
        </div>
        <div className="column is-7-widescreen is-8-desktop is-12-tablet">
          { this.state.idEvento ? <DetalleEliminarEvento id={this.state.idEvento} />: 
          <div className="card">
            <div className="card-content">
              <div className="section has-text-centered">
                Selecciona un evento
              </div>
            </div>
          </div> }
        </div>
      </div>
    )
  }
}
export default compose(
    graphql(fetchSolicitudEvento, {
        name: 'fetchSolicitudEvento'
    }),
    graphql(AceptarEvento, {
      name: 'AceptarEvento'
    }),
    graphql(DenegarEvento, {
        name: 'DenegarEvento'
    }),
)(SolicitudEliminarEvento);
