import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudPropuesta from '../../../queries/fetchSolicitudPropuesta';
import AceptarPropuesta from '../../../queries/AceptarPropuesta';
import DenegarPropuesta from '../../../queries/DenegarPropuesta';

import DetalleSolicitudPropuesta from './detalle_solicitud_propuesta';

class SolicitudPropuestaModif extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      idPropuesta: null
    }

    this.aceptar = this.aceptar.bind(this);
    this.denegar = this.denegar.bind(this);
    this.seleccionar = this.seleccionar.bind(this);
    this.setState = this.setState.bind(this);
  }

  aceptar(idPropuesta) {
    this.setState({ idPropuesta: null });
    this.props.AceptarPropuesta({
      variables: {
       idPropuesta
      }
    }).then(()=> this.props.fetchSolicitudPropuesta.refetch());
  }

  denegar(idPropuesta) {
    this.setState({ idPropuesta: null });
    this.props.DenegarPropuesta({
      variables: {
        idPropuesta
      }
    }).then(()=> this.props.fetchSolicitudPropuesta.refetch());
  }

  seleccionar(idPropuesta) {
    this.setState({ idPropuesta });
  }

  renderList() {
    return this.props.fetchSolicitudPropuesta.solicitudPropuestas.map(({id, titulo}) => {
      return (
        <div key={id}>
          <div className="panel-block" onClick={()=>{this.seleccionar(id)}} >
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
            <a
            style={{color: 'inherit', textDecoration: 'none'}}
            >{titulo}</a>
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
    if (this.props.fetchSolicitudPropuesta.loading){
      return <div>Loading...</div>
    }
    return (
      <div className="columns is-desktop">
        <div className="column is-3-widescreen is-3-desktop is-12-tablet is-offset-1-tablet is-offset-1-desktop is-offset-2-widescreen">
          <div>
            
          <div className="panel">
            <div className="panel-heading">Propuestas Cambios</div>
            {this.renderList()}
          </div>

          </div>
        </div>
        <div className="column is-5-widescreen is-7-desktop is-12-tablet">
          { this.state.idPropuesta ? <DetalleSolicitudPropuesta id={this.state.idPropuesta} />: 
          <div className="card">
            <div className="card-content">
              <div className="section has-text-centered">
                Selecciona un político
              </div>
            </div>
          </div> }
        </div>
      </div>
    )
  }
}
export default compose(
    graphql(fetchSolicitudPropuesta, {
        name: 'fetchSolicitudPropuesta'
    }),
    graphql(AceptarPropuesta, {
      name: 'AceptarPropuesta'
    }),
    graphql(DenegarPropuesta, {
        name: 'DenegarPropuesta'
    }),
)(SolicitudPropuestaModif);