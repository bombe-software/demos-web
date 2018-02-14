import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudEvento from '../../queries/fetchSolicitudEvento';
import AceptarEvento from '../../queries/AceptarEvento';
import DenegarEvento from '../../queries/DenegarEvento';
import fetchPoliticosDetail from './../../queries/fetchPoliticoDetail';

class SolicitudEvento extends Component {
  constructor(props) {
    super(props);
    this.aceptar = this.aceptar.bind(this);
    this.denegar = this.denegar.bind(this);
  }

  aceptar(idEvento, politico) {
    this.props.AceptarEvento({
      variables: {
       idEvento
      },
      refetchQueries: [
        { 
          query:  fetchPoliticosDetail,
          variables: {
            id: politico.id
          }
        }
      ]
    }).then(()=> this.props.fetchSolicitudEvento.refetch());
  }

  denegar(idEvento, politico) {
    this.props.DenegarEvento({
      variables: {
        idEvento
      },
      refetchQueries: [
        { 
          query:  fetchPoliticosDetail,
          variables: {
            id: politico.id
          }
        }
      ]
    }).then(()=> this.props.fetchSolicitudEvento.refetch());
  }

  renderList() {
    console.log(this.props);
    return this.props.fetchSolicitudEvento.solicitudEventos.map(({id, titulo, politico}) => {
      return (
        <div key={id}>
          <div className="panel-block">
            <span className="panel-icon">
              <a className="is-primary" onClick={() => { this.aceptar(id, politico) }}>
                <i className="fa fa-check"></i>
              </a> &nbsp;&nbsp;&nbsp;
            </span>
            <span className="panel-icon">
              <a className="is-danger" style={{ color: 'red' }} onClick={() => { this.denegar(id, politico) }}>
                <i className="fa fa-times"></i>
              </a>
            </span>
            {titulo}
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
    if (this.props.fetchSolicitudEvento.loading){
      return <div>Loading...</div>
    }
    return (
      <div className="panel">
        <div className="panel-heading">Eventos</div>
        {this.renderList()}
      </div>
    )
  }
}
export default compose(
    graphql(AceptarEvento, {
      name: 'AceptarEvento'
    }),
    graphql(DenegarEvento, {
        name: 'DenegarEvento'
    }),
     graphql(fetchSolicitudEvento, {
        name: 'fetchSolicitudEvento'
    })
)(SolicitudEvento);
