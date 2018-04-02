import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudPropuestaElim from '../../../queries/fetchSolicitudPropuestaElim';
import AceptarElimPropuesta from '../../../mutations/accept/AceptarEliminarPropuesta';
import DenegarElimPropuesta from '../../../mutations/deny/DenegarEliminarPropuesta';
import AumentarPuntos from '../../../mutations/aumentarPuntos';
import RestarPuntos from '../../../mutations/restarPuntos';
import DetalleSolicitudEliminarPropuesta from './detalle_eliminar_propuesta';

class SolicitudEliminarPropuesta extends Component {
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

  aceptar(id_solicitud,id_usuario) {
    this.setState({ idPropuesta: null });
    this.props.AumentarPuntos({
      variables: {
        id_usuario
      }
    })
    this.props.AceptarElimPropuesta({
      variables: {
        id_solicitud
      }
    }).then(() => this.props.fetchSolicitudPropuestaElim.refetch());
  }

  denegar(id_solicitud, id_usuario) {
    this.setState({ idPropuesta: null });
    this.props.RestarPuntos({
      variables: {
        id_usuario
      }
    })
    this.props.DenegarElimPropuesta({
      variables: {
        id_solicitud
      }
    }).then(() => this.props.fetchSolicitudPropuestaElim.refetch());
  }
  componentWillReceiveProps(nextProps) {
    nextProps.fetchSolicitudPropuestaElim.refetch();
  } 
  seleccionar(idPropuesta) {
    this.setState({ idPropuesta });
  }

  renderList() {
    return this.props.fetchSolicitudPropuestaElim.solicitudesDeletePropuesta.map(({id, id_propuesta, id_usuario}) => {
      return (
        <div key={id}>
          <div className="panel-block" >
            <span className="panel-icon">
              <a className="is-primary" onClick={() => { this.aceptar(id,id_usuario.id) }}>
                <i className="fa fa-check"></i>
              </a> &nbsp;&nbsp;&nbsp;
            </span>
            <span className="panel-icon">
              <a className="is-danger" style={{ color: 'red' }} onClick={() => { this.denegar(id,id_usuario.id) }}>
                <i className="fa fa-times"></i>
              </a>
            </span>
            <a onClick={() => { this.seleccionar(id) }}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >{id_propuesta.titulo}</a>
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
  renderSectionPropuesta() {
    if (this.state.idPropuesta != null) {
      return <DetalleSolicitudEliminarPropuesta id={this.state.idPropuesta} />;
    } else {
      return (
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
    if (this.props.fetchSolicitudPropuestaElim.loading) {
      return <div>Loading...</div>
    }
    return (
      <div className="columns is-desktop">
        <div className="column is-5-widescreen is-4-desktop is-12-tablet">
          <div>

            <div className="panel">
              <div className="panel-heading">Propuestas Cambios</div>
              {this.renderList()}
            </div>

          </div>
        </div>
        <div className="column is-7-widescreen is-8-desktop is-12-tablet">
          {this.renderSectionPropuesta()}
        </div>
      </div>
    )
  }
}
export default compose(
  graphql(fetchSolicitudPropuestaElim, {
    name: 'fetchSolicitudPropuestaElim'
  }),
  graphql(AceptarElimPropuesta, {
    name: 'AceptarElimPropuesta'
  }),
  graphql(DenegarElimPropuesta, {
    name: 'DenegarElimPropuesta'
  }),
  graphql(AumentarPuntos, {
    name: 'AumentarPuntos'
  }),
  graphql(RestarPuntos, {
    name: 'RestarPuntos'
  })
)(SolicitudEliminarPropuesta);