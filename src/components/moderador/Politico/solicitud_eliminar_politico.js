import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudPoliticoElim from '../../../queries/fetchSolicitudPoliticoElim';

import AceptarElimPolitico from '../../../mutations/accept/AceptarEliminarPolitico'
import DenegarElimPolitico from '../../../mutations/deny/DenegarEliminarPolitico';

import DetalleEliminarPolitico from './detalle_eliminar_politico';

class SolicitudEliminarPolitico extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      idPolitico: null,
    }

    this.aceptar = this.aceptar.bind(this);
    this.denegar = this.denegar.bind(this);
    this.seleccionar = this.seleccionar.bind(this);
    this.setState = this.setState.bind(this);
  }

  aceptar(id_solicitud) {
    this.setState({ idPolitico: null });
    this.props.AceptarElimPolitico({
      variables: {
       id_solicitud
      }
    }).then(()=> this.props.fetchSolicitudPoliticoElim.refetch());
  }

  denegar(id_solicitud) {
    this.setState({ idPolitico: null });
    this.props.DenegarElimPolitico({
      variables: {
        id_solicitud
      }
    }).then(()=> this.props.fetchSolicitudPoliticoElim.refetch());
  }
  shouldComponentUpdate(nextProps){
    if(nextProps.fetchSolicitudPoliticoElim)
    {
    nextProps.fetchSolicitudPoliticoElim.refetch();
    return true;
    }
}
  seleccionar(idPolitico) {
    this.setState({ idPolitico });
  }

  renderList() {
    return this.props.fetchSolicitudPoliticoElim.solicitudesDeletePolitico.map(({id,id_politico, id_usuario}) => {
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
            >{id_politico.nombre}</a>
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
    if (this.props.fetchSolicitudPoliticoElim.loading){
      return <div>Loading...</div>
    }
    return (
      <div className="columns is-desktop">
        <div className="column is-5-widescreen is-5-desktop is-12-tablet">
          <div>
            
          <div className="panel">
            <div className="panel-heading">Politicos</div>
            {this.renderList()}
          </div>

          </div>
        </div>
        <div className="column is-7-widescreen is-7-desktop is-12-tablet">
          { this.state.idPolitico ? <DetalleEliminarPolitico id={this.state.idPolitico} />: 
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
    graphql(fetchSolicitudPoliticoElim, {
        name: 'fetchSolicitudPoliticoElim'
    }),
    graphql(AceptarElimPolitico, {
      name: 'AceptarElimPolitico'
    }),
    graphql(DenegarElimPolitico, {
        name: 'DenegarElimPolitico'
    }),
)(SolicitudEliminarPolitico);
