import React, { Component } from 'react';

//Components
import PendientesAgregarPropuestas from './Propuesta/solicitud_agregar_propuesta';
import PendientesAgregarHistorial from './Evento/solicitud_agregar_evento';
import PendientesAgregarPoliticos from './Politico/solicitud_agregar_politico';

 import PendientesModificarPoliticos from './Politico/solicitud_politico_modif';
 import PendientesModificarHistorial from './Evento/solicitud_evento_modif';
 import PendientesModificarPropuestas from './Propuesta/solicitud_propuesta_modif';

class Moderador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'propuestas',
      tabList: 'nuevo'
    };
    this.updatePropuestas = this.updatePropuestas.bind(this);
    this.updateHistorial = this.updateHistorial.bind(this);
    this.updatePoliticos = this.updatePoliticos.bind(this);

    this.renderPendientesPoliticos = this.renderPendientesPoliticos.bind(this);
    this.renderPendientesPropuestas = this.renderPendientesPropuestas.bind(this);
    this.renderPendientesHistorial = this.renderPendientesHistorial.bind(this);

    this.updateNuevo = this.updateNuevo.bind(this);
    this.updateModificacion = this.updateModificacion.bind(this);
    this.updateEliminar = this.updateEliminar.bind(this);

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
  updateNuevo() {
    this.setState({ tabList: 'nuevo' });
  }
  updateModificacion() {
    this.setState({ tabList: 'modif' })
  }
  updateEliminar() {
    this.setState({ tabList: 'eliminar' })
  }
  renderPendientesPoliticos() {
    let tabList = this.state.tabList;
    if (tabList == "nuevo") {
      return (
        <div>
          <PendientesAgregarPoliticos />
        </div>
      );
    }
    else if (tabList == "modif") {
      return (
        <div>
          <PendientesModificarPoliticos />
        </div>
      );
    } else if (tabList == "eliminar") {
      return (
        <div>

        </div>
      );
    }
  }

  renderPendientesHistorial() {
    let tabList = this.state.tabList;
    if (tabList == "nuevo") {
      return (
        <div>
          <PendientesAgregarHistorial />
        </div>
      );
    }
    else if (tabList == "modif") {
      return (
        <div>
          <PendientesModificarHistorial />
        </div>
      );
    } else if (tabList == "eliminar") {
      return (
        <div>

        </div>
      );
    }
  }
  renderPendientesPropuestas() {
    let tabList = this.state.tabList;
    if (tabList == "nuevo") {
      return (
        <div>
          <PendientesAgregarPropuestas />
        </div>
      );
    }
    else if (tabList == "modif") {
      return (
        <div>
          <PendientesModificarPropuestas />
        </div>
      );
    } else if (tabList == "eliminar") {
      return (
        <div>

        </div>
      );
    }
  }

  update() {
    let type = this.state.type;
    if (type == "propuestas") {
      return (
        <div>
          <div className="tabs is-toggle">
            <ul>
              <li className={this.state.tabList == "nuevo" ? 'is-active' : ''}>
                <a onClick={this.updateNuevo}>Nuevo</a>
              </li>
              <li className={this.state.tabList == "modif" ? 'is-active' : ''}>
                <a onClick={this.updateModificacion}>Modificacion</a>
              </li>
              <li className={this.state.tabList == "eliminar" ? 'is-active' : ''}>
                <a onClick={this.updateEliminar}>Eliminar</a>
              </li>
            </ul>
          </div>
          {this.renderPendientesPropuestas()}
        </div>
      );
    } else if (type == "historial") {
      return (
        <div>
          <div className="tabs is-toggle">
            <ul>
              <li className={this.state.tabList == "nuevo" ? 'is-active' : ''}>
                <a onClick={this.updateNuevo}>Nuevo</a>
              </li>
              <li className={this.state.tabList == "modif" ? 'is-active' : ''}>
                <a onClick={this.updateModificacion}>Modificacion</a>
              </li>
              <li className={this.state.tabList == "eliminar" ? 'is-active' : ''}>
                <a onClick={this.updateEliminar}>Eliminar</a>
              </li>
            </ul>
          </div>
          {this.renderPendientesHistorial()}
        </div>
      );
    } else if (type == "politicos") {
      return (
        <div>
          <div className="tabs is-toggle">
            <ul>
              <li className={this.state.tabList == "nuevo" ? 'is-active' : ''}>
                <a onClick={this.updateNuevo}>Nuevo</a>
              </li>
              <li className={this.state.tabList == "modif" ? 'is-active' : ''}>
                <a onClick={this.updateModificacion}>Modificacion</a>
              </li>
              <li className={this.state.tabList == "eliminar" ? 'is-active' : ''}>
                <a onClick={this.updateEliminar}>Eliminar</a>
              </li>
            </ul>
          </div>
          {this.renderPendientesPoliticos()}
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
