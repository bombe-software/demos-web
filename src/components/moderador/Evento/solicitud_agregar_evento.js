import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudEvento from '../../../queries/fetchSolicitudEvento';
import AumentarPuntos from '../../../mutations/aumentarPuntos';
import RestarPuntos from '../../../mutations/restarPuntos';
import AceptarEvento from '../../../mutations/accept/AceptarEvento'
import DenegarEvento from '../../../mutations/deny/DenegarEvento';

import DetalleSolicitudEvento from './detalle_solicitud_evento';

class SolicitudEvento extends Component {
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

  aceptar(idEvento,id_usuario) {
    this.setState({ idEvento: null });
    this.props.AumentarPuntos({
      variables: {
        id_usuario
      }
    })
    this.props.AceptarEvento({
      variables: {
        idEvento
      }
    }).then(() => this.props.fetchSolicitudEvento.refetch());
  }

  denegar(idEvento,id_usuario) {
    this.setState({ idEvento: null });
    this.props.RestarPuntos({
      variables: {
        id_usuario
      }
    })
    this.props.DenegarEvento({
      variables: {
        idEvento
      }
    }).then(() => this.props.fetchSolicitudEvento.refetch());
  }
  componentWillReceiveProps(nextProps) {
    nextProps.fetchSolicitudEvento.refetch();
  } 
  seleccionar(idEvento) {
    this.setState({ idEvento });
  }

  renderList() {
    return this.props.fetchSolicitudEvento.solicitudEventos.map(({id, titulo, usuario}) => {
      return (
        <div key={id}>
          <div className="panel-block" >
            <span className="panel-icon">
              <a className="is-primary" onClick={() => { this.aceptar(id, usuario.id) }}>
                <i className="fa fa-check"></i>
              </a> &nbsp;&nbsp;&nbsp;
            </span>
            <span className="panel-icon">
              <a className="is-danger" style={{ color: 'red' }} onClick={() => { this.denegar(id,usuario.id) }}>
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
              <div className="panel-heading">Eventos</div>
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
  graphql(AceptarEvento, {
    name: 'AceptarEvento'
  }),
  graphql(DenegarEvento, {
    name: 'DenegarEvento'
  }),
  graphql(AumentarPuntos, {
    name: 'AumentarPuntos'
  }),
  graphql(RestarPuntos, {
    name: 'RestarPuntos'
  })
)(SolicitudEvento);

