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
  }

  aceptar(id_solicitudo) {
    this.setState({ idPolitico: null });
    this.props.AceptarPolitico({
      variables: {
      id_solicitud 
    }
    })
  }

  denegar(idPolitico) {
    this.setState({ idPolitico: null });
    this.props.DenegarPolitico({
      variables: {
        idPolitico
      }
    }).then(()=> this.props. fetchSolicitudPoliticoModif.refetch());
  }

  seleccionar(idPolitico) {
    this.setState({ idPolitico });
  }

  renderList() {
    return this.props.fetchSolicitudPoliticoModif.solicitudesModificarPolitico.map(({id, nombre}) => {
      return (
        <div key={id}>
          <div className="panel-block" onClick={()=>{this.seleccionar(id)}} >
            <span className="panel-icon">
              <a className="is-primary" onClick={() => { this.aceptar(id,id_politico) }}>
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

  render() {
    if (this.props.fetchSolicitudPoliticoModif.loading){
      return <div>Loading...</div>
    }
    return (
      <div className="columns is-desktop">
        <div className="column is-3-widescreen is-3-desktop is-12-tablet is-offset-1-tablet is-offset-1-desktop is-offset-2-widescreen">
          <div>
            
          <div className="panel">
            <div className="panel-heading">Politicos Cambios</div>
            {this.renderList()}
          </div>

          </div>
        </div>
        <div className="column is-5-widescreen is-7-desktop is-12-tablet">
          { this.state.idPolitico ? <DetalleSolicitudModificarPolitico id={this.state.idPolitico} />: 
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
