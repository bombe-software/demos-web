import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from 'react-apollo';
import addPolitico from '../../queries/addPolitico';
import fetchPartidos from '../../queries/fetchPartidos';
import fetchTipoPolitico from '../../queries/fetchTipoPolitico';
import fetchEstados from '../../queries/fetchEstados';
import { compose } from 'react-apollo';

class NuevoPolitico extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      partido: '',
      tipo_politico: '',
      estado: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderPartidos(event) {
    const array = [{id:'0', partido: 'Opcion default'}]
          .concat(this.props.fetchPartidos.partidos);
    return array.map(({ id, partido }) => {
      return (
        <option value={id} key={id} className="collection-item">
          {partido}
        </option>
      );
    });
  }
  renderTipo(event) {
    const array = [{id:'0', tipo: 'Opcion default'}]
    .concat(this.props.fetchTipoPolitico.tipos_politico);
    return array.map(({ id, tipo }) => {
      return (
        <option value={id} key={id} className="collection-item">
          {tipo}
        </option>
      );
    });
  }
  renderEstado(event) {
    const array = [{id:'0', estado: 'Opcion default'}]
    .concat(this.props.fetchEstados.estados);
    return array.map(({ id, estado }) => {
      return (
        <option value={id} key={id} className="collection-item">
          {estado}
        </option>
      );
    });

  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state)
    const {
            nombre, partido, tipo_politico, estado
        } = this.state
    this.props.addPolitico({
      variables: {
        nombre, partido, tipo_politico, estado
      }
    }).then(alert('Informacion enviada'));
  }

  render() {
    if (this.props.fetchPartidos.loading || this.props.fetchTipoPolitico.loading || this.props.fetchEstados.loading) { return <div>Loading...</div>; }

    return (
      <div><section className="hero is-large">
        <div className="section">
          <div className="columns">
            <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
              <div className="box"><div className="has-text-centered"><h1 className="title is-3">Crear político</h1></div><hr />
                <form onSubmit={this.handleSubmit}>
                  <div className="level">
                    <div className="level-item">
                      <input type="text" onLoad={event => this.setState({ nombre: event.target.value }) } onChange={event => this.setState({ nombre: event.target.value })}
                        value={this.state.nombre} placeholder="Nombre del Politico" label="Nombre del Politico" />
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item">
                      <select onChange={event => this.setState({ partido: event.target.value }) }>
                        {this.renderPartidos(event)}
                      </select>
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item">
                      <select onChange={event => this.setState({ tipo_politico: event.target.value })}>
                        {this.renderTipo(event)}
                      </select>
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item">
                      <select onChange={event => this.setState({ estado: event.target.value })}>
                        {this.renderEstado(event)}
                      </select>
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item">
                      <div>
                        <button type="submit" className="button is-info">
                          Submit
            </button>
                      </div></div></div>
                </form>
              </div></div></div></div></section>
      </div>
    );
  }
}

export default compose(
  graphql(addPolitico,
    {
      name: 'addPolitico'
    }),
  graphql(fetchPartidos, {
    name: 'fetchPartidos'
  }),
  graphql(fetchTipoPolitico, {
    name: 'fetchTipoPolitico'
  }),
  graphql(fetchEstados, {
    name: 'fetchEstados'
  })
)(NuevoPolitico);

