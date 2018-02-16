import React, { Component } from 'react';

//Components
import PendientesPropuestas from './solicitud_propuesta';
import PendientesHistorial from './solicitud_evento';
import PendientesPoliticos from './solicitud_politico';

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
          <PendientesPropuestas  />
        </div>
      );
    } else if (type == "historial") {
      return (
        <div>
          <PendientesHistorial />
        </div>
      );
    }else if (type == "politicos") {
      return (
        <div>
          <PendientesPoliticos />
        </div>
      );
    }
  }

  render() {
    return (
      <div className="section">
        <div className="columns is-desktop">
          <div className="column is-8-widescreen is-10-dektop is-10-tablet is-offset-1-desktop is-offset-2-widescreen is-offset-1-tablet">
          <h1 className="is-size-2">Moderador</h1>
          <hr />
          <div className="tabs is-medium">
            <ul>
              <li className={this.state.type=="propuestas" ? 'is-active' : ''}>
                <a onClick={this.updatePropuestas}>Propuestas</a>
              </li>
              <li className={this.state.type=="historial" ? 'is-active' : ''}>
                <a onClick={this.updateHistorial}>Historial</a>
              </li>
              <li className={this.state.type=="politicos" ? 'is-active' : ''}>
                <a onClick={this.updatePoliticos}>Politicos</a>
              </li>
            </ul>
          </div>
          </div>
        </div>
        <div>
          {this.update()}
        </div>
        <div className="level"><br /><br /></div>
      </div>
    )
  }

}

export default Moderador;
