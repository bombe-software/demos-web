import { Link } from "react-router-dom";
import React, { Component } from "react";
class PoliticosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          puestos: ['Funcionario', 'Candidato']
      };
  }

  componentDidMount() {
    this.props.fetchPoliticos(this.props.id_puesto, this.props.id_estado);
  }

  renderTitle() {
    let {id_estado} = this.props;
    if(id_estado == 33){
      return (
          <div>
              <p key={1}>{this.state.puestos[this.props.id_puesto]}&nbsp;/&nbsp;Nacional</p>
          </div>
      );
    }else{
      return (
            <p>
              {this.state.puestos[this.props.id_puesto]}&nbsp;/&nbsp;
              {this.props.estados[this.props.id_estado].zona}&nbsp;/&nbsp;
              {this.props.estados[this.props.id_estado-1].nombre}
            </p>
      );
    }
  }




  renderListPoliticos(){
    let {politicos} = this.props;
    return _.map(politicos, politico => {
      console.log(politico);
      return (
          <div key={politico.id_politico}>
              <div className="panel-block">
                  <span className="panel-icon"><i className="fa fa-user"></i></span>
                  <Link to={'/politico/'+politico.id_politico} >
                    {politico.nombre}
                  </Link>
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
  render(){
    return(
      <div>
        <div className="level">
            <div className="level-left"></div>
                <div className="level-right">
                  <div className="level-item">
                    <p className="has-text-right">
                      <Link to="/crear/politico/" className="button is-success">
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

function mapStateToProps(state) {
    return { politicos: state.politico.politicos };
}

export default PoliticosList;