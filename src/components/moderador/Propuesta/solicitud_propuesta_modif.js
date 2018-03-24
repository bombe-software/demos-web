import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudPropuestaModif from '../../../queries/fetchSolicitudPropuestaModif';
import AceptarPropuesta from '../../../queries/AceptarModifPropuesta';
import DenegarPropuesta from '../../../queries/DenegarModifPropuesta';

import DetalleSolicitudModificarPropuesta from './detalle_modificar_propuesta';

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
    this.renderSectionPropuesta = this.renderSectionPropuesta.bind(this);
  }

  aceptar(id_solicitud) {
    this.setState({ idPropuesta: null });
    this.props.AceptarPropuesta({
      variables: {
       id_solicitud
      }
    }).then(()=> this.props.fetchSolicitudPropuestaModif.refetch());
  }

  denegar(id_solicitud) {
    this.setState({ idPropuesta: null });
    this.props.DenegarPropuesta({
      variables: {
        id_solicitud
      }
    }).then(()=> this.props.fetchSolicitudPropuestaModif.refetch());
  }

  seleccionar(idPropuesta) {
    this.setState({ idPropuesta });
  }

  renderList() {
    return this.props.fetchSolicitudPropuestaModif.solicitudesModificarPropuesta.map(({id, titulo}) => {
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
            <a onClick={()=>{this.seleccionar(id)}} 
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
 renderSectionPropuesta(){
    if(this.state.idPropuesta!=null){
      return <DetalleSolicitudModificarPropuesta id={this.state.idPropuesta} />;
    }else{
      return(          
        <div className="card">
            <div className="card-content">
              <div className="section has-text-centered">
                Selecciona una propuesta
              </div>
            </div>
          </div>
        );
    }
  }
  render() {
    if (this.props.fetchSolicitudPropuestaModif.loading){
      return <div>Loading...</div>
    }
    return (
      <div className="columns is-desktop">
        <div className="column is-5-widescreen is-5-desktop is-12-tablet">
          <div>
            
          <div className="panel">
            <div className="panel-heading">Propuestas Cambios</div>
            {this.renderList()}
          </div>

          </div>
        </div>
        <div className="column is-7-widescreen is-7-desktop is-12-tablet">
        {this.renderSectionPropuesta()}
        </div>
      </div>
    )
  }
}
export default compose(
    graphql(fetchSolicitudPropuestaModif, {
        name: 'fetchSolicitudPropuestaModif'
    }),
    graphql(AceptarPropuesta, {
      name: 'AceptarPropuesta'
    }),
    graphql(DenegarPropuesta, {
        name: 'DenegarPropuesta'
    }),
)(SolicitudPropuestaModif);