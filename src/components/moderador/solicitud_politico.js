import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudPolitico from '../../queries/fetchSolicitudPolitico';
import AceptarPolitico from '../../queries/AceptarPolitico';
import DenegarPolitico from '../../queries/DenegarPolitico';

class SolicitudPolitico extends Component {
  constructor(props) {
    super(props);
    this.aceptar = this.aceptar.bind(this);
    this.denegar = this.denegar.bind(this);
  }

  aceptar(idPolitico) {
    this.props.AceptarPolitico({
      variables: {
       idPolitico
      }
    }).then(()=> this.props.fetchSolicitudPolitico.refetch());
  }

  denegar(idPolitico) {
    this.props.DenegarPolitico({
      variables: {
        idPolitico
      }
    }).then(()=> this.props.fetchSolicitudPolitico.refetch());
  }

  renderList() {

    return this.props.fetchSolicitudPolitico.solicitudPoliticos.map(({id, nombre}) => {
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
            {nombre}
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
    if (this.props.fetchSolicitudPolitico.loading){
      return <div>Loading...</div>
    }
    return (
      <div className="panel">
        <div className="panel-heading">Politicos</div>
        {this.renderList()}
      </div>
    )
  }
}
export default compose(
    graphql(AceptarPolitico, {
      name: 'AceptarPolitico'
    }),
    graphql(DenegarPolitico, {
        name: 'DenegarPolitico'
    }),
     graphql(fetchSolicitudPolitico, {
        name: 'fetchSolicitudPolitico'
    })
)(SolicitudPolitico);
