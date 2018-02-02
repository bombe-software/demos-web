import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudPropuesta from '../../queries/fetchSolicitudPropuesta';
import AceptarPropuesta from '../../queries/AceptarPropuesta';
import DenegarPropuesta from '../../queries/DenegarPropuesta';

class SolicitudPropuesta extends Component {
  constructor(props) {
    super(props);
    this.aceptar = this.aceptar.bind(this);
    this.denegar = this.denegar.bind(this);
  }

  aceptar(idPropuesta) {

    this.props.AceptarPropuesta({
      variables: {
       idPropuesta
      }
    }).then(()=> this.props.fetchSolicitudPropuesta.refetch());
  }

  denegar(idPropuesta) {
    this.props.DenegarPropuesta({
      variables: {
        idPropuesta
      }
    }).then(()=> this.props.fetchSolicitudPropuesta.refetch());
  }

  renderList() {

    return this.props.fetchSolicitudPropuesta.solicitudPropuestas.map(({id, titulo}) => {
      return (
        <div key={id}>
          <div className="panel-block">
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
    console.log(this.props);
    if (this.props.fetchSolicitudPropuesta.loading){
      return <div>Loading...</div>
    }
    return (
      <div className="panel">
        <div className="panel-heading">Propuestas</div>
        {this.renderList()}
      </div>
    )
  }
}
export default compose(
    graphql(AceptarPropuesta, {
      name: 'AceptarPropuesta'
    }),
    graphql(DenegarPropuesta, {
        name: 'DenegarPropuesta'
    }),
     graphql(fetchSolicitudPropuesta, {
        name: 'fetchSolicitudPropuesta'
    })
)(SolicitudPropuesta);
