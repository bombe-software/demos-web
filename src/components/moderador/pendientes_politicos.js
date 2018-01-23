import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPendientesPolitico, callPolitico, deletePolitico } from "../../actions";

class PendientesPoliticos extends Component {
  constructor(props) {
    super(props);
    this.aceptar = this.aceptar.bind(this);
    this.denegar = this.denegar.bind(this);
  }

  componentDidMount() {
    this.props.fetchPendientesPolitico();
  }

  aceptar(id) {
    let { fetchPendientesPolitico } = this.props;
    this.props.callPolitico(id, fetchPendientesPolitico);

  }

  denegar(id) {
    let { fetchPendientesPolitico } = this.props;
    this.props.deletePolitico(id, fetchPendientesPolitico);
  }

  renderList() {
    let { politicos } = this.props;
    return _.map(politicos, politico => {
      return (
        <div key={politico.id_politico}>
         <div className="panel-block">
            <span className="panel-icon">
              <a className="is-primary" onClick = {()=>{this.aceptar(politico.id_politico)}}>
                <i className="fa fa-check"></i>
              </a> &nbsp;&nbsp;&nbsp;
            </span>
            <span className="panel-icon">
              <a className="is-danger" style={{color: 'red'}} onClick = {()=>{this.denegar(politico.id_politico)}}>
                <i className="fa fa-times"></i>
              </a>
            </span>
            {politico.nombre}
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
    return (
      <div className="panel">
        <div className="panel-heading">Politicos</div>
        {this.renderList()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    politicos: state.pendientes.politicos
  };
}

export default connect(mapStateToProps, { fetchPendientesPolitico, callPolitico, deletePolitico })(PendientesPoliticos);
