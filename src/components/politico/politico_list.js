import { Link } from "react-router-dom";
import React, { Component } from "react";
import { compose } from "react-apollo";
import { graphql } from 'react-apollo';
import fetchPoliticosPorEstado from '../../queries/fetchPoliticosPorEstado';
import fetchPoliticos from '../../queries/fetchPoliticos';

class PoliticoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puestos: ['Candidato', 'Funcionario']
    };
  }
  renderTitle() {
    let {id_estado} = this.props;
    if (id_estado === "5a66340f2ad334a3426ebc49") {
      return (
        <div>
          <p key={1}>{this.state.puestos[this.props.id_puesto]}&nbsp;/&nbsp;Nacional</p>
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
    return this.props.fetchPoliticosPorEstado.politicosPorEstado.map(({ id, nombre, cargo }) => {
      if (this.state.puestos[this.props.id_puesto] === cargo) {
        return (
          <div key={id}>
            <div className="panel-block">
              <span className="panel-icon"><i className="fa fa-user"></i></span>
              <Link to={'/politico/' + id} >
                {nombre}
              </Link>
            </div>
          </div>
        );
      }
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
  }
  render() {
    if (this.props.fetchPoliticosPorEstado.loading) { return <div>Loading...</div> }
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
        <div className="panel">
          <div className="panel-heading">
            <h3>{this.renderTitle()}</h3>
          </div>
          {this.renderListPoliticos()}
        </div>
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