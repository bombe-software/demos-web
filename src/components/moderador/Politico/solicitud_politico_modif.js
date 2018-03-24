import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudPoliticoModif from '../../../queries/fetchSolicitudPoliticoModif';

import AceptarPolitico from '../../../queries/AceptarModifPolitico'
import DenegarPolitico from '../../../queries/DenegarModifPolitico';

import DetalleSolicitudModificarPolitico from './detalle_modificar_politico';

class SolicitudPoliticoModif extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      idPolitico: null
    }

    this.aceptar = this.aceptar.bind(this);
    this.denegar = this.denegar.bind(this);
    this.seleccionar = this.seleccionar.bind(this);
    this.setState = this.setState.bind(this);
    this.renderSectionPolitico = this.renderSectionPolitico.bind(this);
  }

  aceptar(id_solicitud) {
    this.setState({ idPolitico: null });
    this.props.AceptarPolitico({
      variables: {
      id_solicitud 
    }
    }).then(()=> this.props.fetchSolicitudPoliticoModif.refetch());
  }

  denegar(id_solicitud) {
    this.setState({ idPolitico: null });
    this.props.DenegarPolitico({
      variables: {
        id_solicitud
      }
    }).then(()=> this.props.fetchSolicitudPoliticoModif.refetch());
  }

  seleccionar(idPolitico) {
    this.setState({ idPolitico });
  }

  renderList() {
    return this.props.fetchSolicitudPoliticoModif.solicitudesModificarPolitico.map(({id, nombre}) => {
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
            >{nombre}</a>
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
  renderSectionPolitico(){
    if(this.state.idPolitico!=null){
      return <DetalleSolicitudModificarPolitico id={this.state.idPolitico} />;
    }else{
      return(          
        <div className="card">
            <div className="card-content">
              <div className="section has-text-centered">
                Selecciona un politico
              </div>
            </div>
          </div>
        );
    }
  }
  render() {
    if (this.props.fetchSolicitudPoliticoModif.loading){
      return <div>Loading...</div>
    }
    return (
      <div className="columns is-desktop">
        <div className="column is-5-widescreen is-5-desktop is-12-tablet">
          <div>
            
          <div className="panel">
            <div className="panel-heading">Politicos Cambios</div>
            {this.renderList()}
          </div>

          </div>
        </div>
        <div className="column is-7-widescreen is-7-desktop is-12-tablet">
         { this.renderSectionPolitico()}
        </div>
      </div>
    )
  }
}
export default compose(
    graphql(fetchSolicitudPoliticoModif, {
        name: 'fetchSolicitudPoliticoModif'
    }),
    graphql(AceptarPolitico, {
      name: 'AceptarPolitico'
    }),
    graphql(DenegarPolitico, {
        name: 'DenegarPolitico'
    })
)(SolicitudPoliticoModif);
