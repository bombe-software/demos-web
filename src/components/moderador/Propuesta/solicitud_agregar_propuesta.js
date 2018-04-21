import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudPropuesta from '../../../queries/fetchSolicitudPropuesta';
import AceptarPropuesta from '../../../mutations/accept/AceptarPropuesta';
import DenegarPropuesta from '../../../mutations/deny/DenegarPropuesta';
import AumentarPuntos from '../../../mutations/aumentarPuntos';
import RestarPuntos from '../../../mutations/restarPuntos';
import AscenderModerador from '../../../mutations/ascenderModerador';
import fetchUsuario from '../../../queries/fetchUsuario';

import DetalleSolicitudPropuesta from './detalle_solicitud_propuesta';

class SolicitudPropuesta extends Component {
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

  aceptar(idPropuesta,id_usuario, puntos) {
    this.setState({ idPropuesta: null });
    this.props.AumentarPuntos({
      variables: {
        id_usuario
      }
    })
    if (puntos > 1000) {
      this.props.AscenderModerador({
        variables: {
          id_usuario
        }
      })
    }
    this.props.AceptarPropuesta({
      variables: {
       idPropuesta
      }
    }).then(()=> this.props.fetchSolicitudPropuesta.refetch());
  }

  denegar(idPropuesta,id_usuario, puntos) {
    this.setState({ idPropuesta: null });
    this.props.RestarPuntos({
      variables: {
        id_usuario
      }
    })
    this.props.DenegarPropuesta({
      variables: {
        idPropuesta
      }
    }).then(()=> this.props.fetchSolicitudPropuesta.refetch());
  }
  componentWillReceiveProps(nextProps) {
    nextProps.fetchSolicitudPropuesta.refetch();
  } 
  seleccionar(idPropuesta) {
    this.setState({ idPropuesta });
  }

  renderList() {
    return this.props.fetchSolicitudPropuesta.solicitudPropuestas.map(({id, titulo, usuario}) => {
      if (this.props.fetchUsuario.usuario.id != usuario.id) {
      return (
        <div key={id}>
          <div className="panel-block"  >
            <span className="panel-icon">
              <a className="is-primary" onClick={() => { this.aceptar(id, usuario.id, usuario.puntos) }}>
                <i className="fa fa-check"></i>
              </a> &nbsp;&nbsp;&nbsp;
            </span>
            <span className="panel-icon">
              <a className="is-danger" style={{ color: 'red' }} onClick={() => { this.denegar(id, usuario.id, usuario.puntos) }}>
                <i className="fa fa-times"></i>
              </a>
            </span>
            <a onClick={()=>{this.seleccionar(id)}}
            style={{color: 'inherit', textDecoration: 'none'}}
            >{titulo}</a>
          </div>
        </div>
      )}
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
    if (this.props.fetchSolicitudPropuesta.loading || this.props.fetchUsuario.loading){
      return <div>Loading...</div>
    }
    return (
      <div className="columns is-desktop">
        <div className="column is-5-widescreen is-5-desktop is-12-tablet">
          <div>
            
          <div className="panel">
            <div className="panel-heading">Propuestas</div>
            {this.renderList()}
          </div>

          </div>
        </div>
        <div className="column is-7-widescreen is-7-desktop is-12-tablet">
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
    graphql(AumentarPuntos, {
      name: 'AumentarPuntos'
    }),
    graphql(RestarPuntos, {
      name: 'RestarPuntos'
    }),
    graphql(AscenderModerador, {
      name: 'AscenderModerador'
    }),
    graphql(fetchUsuario, {
      name: 'fetchUsuario'
    })
)(SolicitudPropuesta);

