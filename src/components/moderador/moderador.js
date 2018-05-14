import React, { Component } from 'react';
//Components
import Lista from './lista';

import AddPropuesta from './logica/propuesta/add';
import UpdatePropuesta from './logica/propuesta/update';
import DeletePropuesta from './logica/propuesta/delete';

import AddPolitico from './logica/politico/add';
import UpdatePolitico from './logica/politico/update';
import DeletePolitico from './logica/politico/delete';

import AddEvento from './logica/evento/add';
import UpdateEvento from './logica/evento/update';
import DeleteEvento from './logica/evento/delete';

class Moderador extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'propuestas',
      table: 'add'
    };
    this.updateType = this.updateType.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.renderSection = this.renderSection.bind(this);
  }


  updateType(type) {
    return () => {
      this.setState({ type })
    }
  }

  updateTable(table) {
    return () => {
      this.setState({ table })
    }
  }

  renderSection() {
    let Vista = null;
    if (this.state.type == "politicos") {
      switch (this.state.table) {
        case 'add':
          Vista = AddPolitico(Lista)
          return <Vista id_usuario={this.props.id_usuario} />;
        case 'update':
          Vista = UpdatePolitico(Lista)
          return <Vista id_usuario={this.props.id_usuario} />;
        case 'delete':
          Vista = DeletePolitico(Lista)
          return <Vista id_usuario={this.props.id_usuario} />;
        default:
          throw new Error('Fallo con el state')
          break;
      }
    } else if (this.state.type == "eventos") {
      switch (this.state.table) {
        case 'add':
          Vista = AddEvento(Lista)
          return <Vista id_usuario={this.props.id_usuario} />;
        case 'update':
          Vista = UpdateEvento(Lista)
          return <Vista id_usuario={this.props.id_usuario} />;
        case 'delete':
          Vista = DeleteEvento(Lista)
          return <Vista id_usuario={this.props.id_usuario} />;
        default:
          throw new Error('Fallo con el state')
          break;
      }
    } else if (this.state.type == "propuestas") {
      switch (this.state.table) {
        case 'add':
          Vista = AddPropuesta(Lista)
          return <Vista id_usuario={this.props.id_usuario} />;
        case 'update':
          Vista = UpdatePropuesta(Lista)
          return <Vista id_usuario={this.props.id_usuario} />;
        case 'delete':
          Vista = DeletePropuesta(Lista)
          return <Vista id_usuario={this.props.id_usuario} />;
        default:
          throw new Error('Fallo con el state')
          break;
      }
    }

  }

  render() {
    return (
      <div className="section">
        <div className="columns is-desktop">
          <div className="column is-10-widescreen is-10-desktop is-8-fullhd is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
            <h1 className="is-size-2 title">Moderador</h1>
            <br />
            <div className="tabs is-medium">
              <ul>
                <li className={this.state.type == "propuestas" ? 'is-active' : ''}>
                  <a onClick={this.updateType('propuestas')}>Propuestas</a>
                </li>
                <li className={this.state.type == "eventos" ? 'is-active' : ''}>
                  <a onClick={this.updateType('eventos')}>Historial</a>
                </li>
                <li className={this.state.type == "politicos" ? 'is-active' : ''}>
                  <a onClick={this.updateType('politicos')}>Politicos</a>
                </li>
              </ul>
            </div>
            <div>
              <div className="tabs is-toggle">
                <ul>
                  <li className={this.state.table == "add" ? 'is-active' : ''}>
                    <a onClick={this.updateTable('add')}>Nuevo</a>
                  </li>
                  <li className={this.state.table == "update" ? 'is-active' : ''}>
                    <a onClick={this.updateTable('update')}>Modificacion</a>
                  </li>
                  <li className={this.state.table == "delete" ? 'is-active' : ''}>
                    <a onClick={this.updateTable('delete')}>Eliminar</a>
                  </li>
                </ul>
              </div>
              {this.renderSection()}
            </div>
          </div>
        </div>
        <div className="level"><br /><br /></div>
      </div>
    )
  }
}
export default Moderador;
