import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudPropuestaModif from '../../../queries/fetchSolicitudPropuestaModif';
import AceptarModifPropuesta from '../../../mutations/accept/AceptarModifPropuesta';
import DenegarModifPropuesta from '../../../mutations/deny/DenegarModifPropuesta';
import AumentarPuntos from '../../../mutations/aumentarPuntos';
import RestarPuntos from '../../../mutations/restarPuntos';
import AscenderModerador from '../../../mutations/ascenderModerador';

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

  aceptar(id_solicitud, id_usuario, puntos) {
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
    this.props.AceptarModifPropuesta({
      variables: {
        id_solicitud
      }
    }).then(() => this.props.fetchSolicitudPropuestaModif.refetch());
  }

  denegar(id_solicitud,id_usuario, puntos) {
    this.setState({ idPropuesta: null });
    this.props.RestarPuntos({
      variables: {
        id_usuario
      }
    })
    this.props.DenegarModifPropuesta({
      variables: {
        id_solicitud
      }
    }).then(() => this.props.fetchSolicitudPropuestaModif.refetch());
  }

  seleccionar(idPropuesta) {
    this.setState({ idPropuesta });
  }
  componentWillReceiveProps(nextProps) {
    nextProps.fetchSolicitudPropuestaModif.refetch();
  } 
  renderList() {
    return this.props.fetchSolicitudPropuestaModif.solicitudesModificarPropuesta.map(({id, titulo, usuario}) => {
      return (
        <div key={id}>
          <div className="panel-block" >
            <span className="panel-icon">
              <a className="is-primary" onClick={() => { this.aceptar(id, usuario.id,usuario.puntos) }}>
                <i className="fa fa-check"></i>
              </a> &nbsp;&nbsp;&nbsp;
            </span>
            <span className="panel-icon">
              <a className="is-danger" style={{ color: 'red' }} onClick={() => { this.denegar(id,usuario.id, usuario.puntos) }}>
                <i className="fa fa-times"></i>
              </a>
            </span>
            <a onClick={() => { this.seleccionar(id) }}
              style={{ color: 'inherit', textDecoration: 'none' }}
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
  renderSectionPropuesta() {
    if (this.state.idPropuesta != null) {
      return <DetalleSolicitudModificarPropuesta id={this.state.idPropuesta} />;
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
    if (this.props.fetchSolicitudPropuestaModif.loading) {
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
  graphql(AceptarModifPropuesta, {
    name: 'AceptarModifPropuesta'
  }),
  graphql(DenegarModifPropuesta, {
    name: 'DenegarModifPropuesta'
  }),
  graphql(AumentarPuntos, {
    name: 'AumentarPuntos'
  }),
  graphql(RestarPuntos, {
    name: 'RestarPuntos'
  }),
  graphql(AscenderModerador, {
    name: 'AscenderModerador'
  })
)(SolicitudPropuestaModif);