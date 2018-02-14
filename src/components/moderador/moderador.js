import React, { Component } from 'react';

//Components
import PendientesPropuestas from './solicitud_propuesta';
import PendientesHistorial from './solicitud_evento';
import PendientesPoliticos from './solicitud_politico';
import fetchUsuario from './../../queries/fetchUsuario';
import { graphql } from 'react-apollo';
import NotFound from './../not_found';
class Moderador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'propuestas'
    };
    this.updatePropuestas = this.updatePropuestas.bind(this);
    this.updateHistorial = this.updateHistorial.bind(this);
    this.updatePoliticos = this.updatePoliticos.bind(this);
    this.update = this.update.bind(this);
  }

  updatePropuestas() {
    this.setState({ type: 'propuestas' })
  }
  updateHistorial() {
    this.setState({ type: 'historial' })
  }
  updatePoliticos() {
    this.setState({ type: 'politicos' })
  }

  update() {
    let type = this.state.type;
    if (type == "propuestas") {
      return (
        <div>
          <PendientesPropuestas />
        </div>
      );
    } else if (type == "historial") {
      return (
        <div>
          <PendientesHistorial />
        </div>
      );
    } else if (type == "politicos") {
      return (
        <div>
          <PendientesPoliticos />
        </div>
      );
    }
  }

  render() {
    if (this.props.data.loading) {return(<div>Loading..</div>);
    }
    if (this.props.data.usuario === null) {
      return (
        <NotFound />
      );
    } else if(this.props.data.usuario.tipo_usuario.tipo != "Moderador") {
      return(
        <NotFound />
      );
    }
    return (
      <div className="section">
        <div className="columns is-desktop">
          <div className="column is-8-widescreen is-10-desktop is-10-tablet is-10-mobile is-offset-1-mobile is-offset-1-tablet is-offset-1-desktop is-offset-2-widescreen">
            <h1 className="is-size-2">Moderador</h1>
            <hr />
            <div className="tabs is-medium">
              <ul>
                <li className={this.state.type == "propuestas" ? 'is-active' : ''}>
                  <a onClick={this.updatePropuestas}>Propuestas</a>
                </li>
                <li className={this.state.type == "historial" ? 'is-active' : ''}>
                  <a onClick={this.updateHistorial}>Historial</a>
                </li>
                <li className={this.state.type == "politicos" ? 'is-active' : ''}>
                  <a onClick={this.updatePoliticos}>Politicos</a>
                </li>
              </ul>
            </div>

            <div>
              {this.update()}
            </div>

          </div>
        </div>
        <div className="level"><br /><br /></div>
      </div>
    )
  }

}

export default graphql(fetchUsuario)(Moderador);