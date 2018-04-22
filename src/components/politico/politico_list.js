import { Link } from "react-router-dom";
import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import fetchPoliticosPorEstado from '../../queries/fetchPoliticosPorEstado';
import fetchPoliticos from '../../queries/fetchPoliticos';

import CardPolitico from '../generic/CardPolitico';

class PoliticoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puestos: ['Candidato', 'Funcionario']
    };
  }
  renderTitle() {
    let { id_estado } = this.props;
    if (this.props.id_estado === "5a68b566f5985aaea61a93c") {
      return (
        <div>
        </div>
      );
    } else {
      return (
        <p>
          {this.state.puestos[this.props.id_puesto]}&nbsp;/&nbsp;
              {this.props.zona}&nbsp;/&nbsp;
              {this.props.estados}
        </p>
      );
    }
  }

  renderListPoliticos() {
    if (this.props.id_estado === "5a68b566f5985aaea61a93c") {
      return (
        <div>
          <div className="hero is-light">
            <div className="hero-body">
              <h3>No ha seleccionado ninguna region</h3>
            </div>
          </div>
        </div>
      );
    } else {
      return this.props.fetchPoliticosPorEstado.politicosPorEstado.map(({ id, nombre, cargo, partido }) => {
        if (this.state.puestos[this.props.id_puesto] === cargo) {
          let o = {id, nombre, cargo, partido}
          return (
            <div key={id}>
              <CardPolitico o={o} />
            </div>
          );
        }
      });
    }
  }
  /**
  * Es una forma de capturar cualquier error en la clase 
  * y que este no crashe el programa, ayuda con la depuracion
  * de errores
  * @method componentDidCatch
  * @const info Es más informacion acerca del error
  * @const error Es el titulo del error
  */
  componentWillReceiveProps(nextProps) {
    nextProps.fetchPoliticos.refetch();
    nextProps.fetchPoliticosPorEstado.refetch();
  }
  render() {
    if (this.props.fetchPoliticosPorEstado.loading) { return <div className="spinner"> </div> }
    return (
      <div>
        <div className="level">
          <div className="level-left"></div>
          <div className="level-right">
            <div className="level-item">
              <p className="has-text-right">
                <Link to="/crear/politico" className="button is-success">
                  <i className="fa fa-plus" aria-hidden="true"></i>
                  &nbsp;&nbsp;&nbsp;Agregar un político
                </Link >
              </p>
            </div>
          </div>
        </div>
        <h3 className="title is-3">{this.renderTitle()}</h3>
        <br />
        {this.renderListPoliticos()}
      </div>
    )
  }
}

export default compose(
  graphql(fetchPoliticosPorEstado,
    {
      name: 'fetchPoliticosPorEstado',
      options: (props) => { return { variables: { id: props.id_estado } } }
    }),
  graphql(fetchPoliticos,
    {
      name: 'fetchPoliticos'
    })
)(PoliticoList);