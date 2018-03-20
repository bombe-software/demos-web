import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import fetchSolicitudEvento from '../../../queries/fetchSolicitudEventoModif';

import AceptarEvento from '../../../queries/AceptarModifEvento'
import DenegarEvento from '../../../queries/DenegarModifEvento';

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
    this.props.AceptarEvento({
      variables: {
       id_solicitud
      }
    }).then(()=> this.props.fetchSolicitudEvento.refetch());
  }

  denegar(id_solicitud) {
    this.setState({ idEvento: null });
    this.props.DenegarEvento({
      variables: {
        id_solicitud
      }
    }).then(()=> this.props.fetchSolicitudEvento.refetch());
  }

  seleccionar(idEvento) {
    this.setState({ idEvento });
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
            <a onClick={()=>{this.seleccionar(id)}}
            style={{color: 'inherit', textDecoration: 'none'}}
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

  renderSectionEvento(){
    if(this.state.idEvento){
      return <DetalleSolicitudEvento id={this.state.idEvento} />;
    }else{
      return(          
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
    if (this.props.fetchSolicitudEvento.loading){
      return <div>Loading...</div>
    }
    return (
      <div className="columns is-desktop">
        <div className="column is-3-widescreen is-3-desktop is-12-tablet is-offset-1-desktop is-offset-2-widescreen">
          <div>
            
          <div className="panel">
            <div className="panel-heading">Eventos Cambios</div>
            {this.renderList()}
          </div>

          </div>
        </div>
        <div className="column is-5-widescreen is-7-desktop is-12-tablet">
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
)(SolicitudEventoModif);

