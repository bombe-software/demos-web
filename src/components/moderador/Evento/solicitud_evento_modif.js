import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudEvento from '../../../queries/fetchSolicitudEventoModif';

import AceptarModifEvento from '../../../mutations/accept/AceptarModifEvento'
import DenegarModifEvento from '../../../mutations/deny/DenegarModifEvento';

import DetalleSolicitudEvento from './detalle_modificar_evento';

class SolicitudEventoModif extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idEvento: null
    }

    this.aceptar = this.aceptar.bind(this);
    this.denegar = this.denegar.bind(this);
    this.seleccionar = this.seleccionar.bind(this);
    this.setState = this.setState.bind(this);
    this.renderSectionEvento = this.renderSectionEvento.bind(this);
  }

  aceptar(id_solicitud) {
    this.setState({ idEvento: null });
    this.props.AceptarModifEvento({
      variables: {
        id_solicitud
      }
    }).then(() => this.props.fetchSolicitudEvento.refetch());
  }

  denegar(id_solicitud) {
    this.setState({ idEvento: null });
    this.props.DenegarModifEvento({
      variables: {
        id_solicitud
      }
    }).then(() => this.props.fetchSolicitudEvento.refetch());
  }

  seleccionar(idEvento) {
    this.setState({ idEvento });
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.fetchSolicitudEvento) {
      nextProps.fetchSolicitudEvento.refetch();
      return true;
    }
  }

  renderList() {
    return this.props.fetchSolicitudEvento.solicitudesModificarEvento.map(({id, titulo}) => {
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
            <a onClick={() => { this.seleccionar(id) }}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >{titulo}</a>
          </div>
        </div>
      );
    });
  }

  componentDidCatch(error, info) {
    console.log("Error: " + error);
    console.log("Info: " + info);
  }

  renderSectionEvento() {
    if (this.state.idEvento) {
      return <DetalleSolicitudEvento id={this.state.idEvento} />;
    } else {
      return (
        <div className="card">
          <div className="card-content">
            <div className="section has-text-centered">
              Selecciona un evento
              </div>
          </div>
        </div>
      );
    }
  }

  render() {
    if (this.props.fetchSolicitudEvento.loading) {
      return <div>Loading...</div>
    }
    return (
      <div className="columns is-desktop">
        <div className="column is-5-widescreen is-5-desktop is-12-tablet">
          <div>

            <div className="panel">
              <div className="panel-heading">Eventos Cambios</div>
              {this.renderList()}
            </div>

          </div>
        </div>
        <div className="column is-7-widescreen is-7-desktop is-12-tablet">
          {this.renderSectionEvento()}
        </div>
      </div>

    )
  }
}
export default compose(
  graphql(fetchSolicitudEvento, {
    name: 'fetchSolicitudEvento'
  }),
  graphql(AceptarModifEvento, {
    name: 'AceptarModifEvento'
  }),
  graphql(DenegarModifEvento, {
    name: 'DenegarModifEvento'
  }),
)(SolicitudEventoModif);

