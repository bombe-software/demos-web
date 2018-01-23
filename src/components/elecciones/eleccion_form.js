import React, { Component } from "react";

import { graphql } from 'react-apollo';
import eleccion from "../../queries/fetchVotacionEstado";

class EleccionForm extends Component {
    
    constructor(props) {
        super(props);
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
    /*
    renderListPoliticos(){
        let {politicos} = this.props;
        let selected = {'border': 'rgba(69, 196, 158, 0.9) solid 2px'}
        return _.map(politicos, politico => {
          return (
              <div style={{'cursor': 'pointer'}} key={politico.id_politico} onClick={this.handlePoliticoSelected(politico.id_politico)}>
              <br />

                    <div className="box" style={this.state.id_politico_selected == politico.id_politico ? {selected}:{}}>
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-32x32">
                          <img src="../../assets/img/politico.png" alt="Placeholder image" />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-4">{politico.nombre}&nbsp;&nbsp;&nbsp;
                        </p>
                        {console.log(politico)}
                      </div>
                    </div>
                    </div>

              </div>
          );
        });
      }
    */
    render() {
        return (
            <div>
                <div className="card-content">
                    <div className="title">
                        <nav className="breadcrumb" aria-label="breadcrumbs">
                            <ul>
                                <React.Fragment>
                                    <li><a href="#" >Estatal</a></li>
                                    <li><a href="#" >{this.props.zona}</a></li>
                                    <li key><a href="#" >{this.props.estado}</a></li>
                                </React.Fragment>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="card-image">
                    <div className="hero is-small">
                        <div className="hero-body">
                            {/*
                            this.renderListPoliticos()
                            */}
                        </div>
                    </div>
                </div>
                <div className="level">
                    <div className="level-item">
                        <button className="button is-primary" onClick={this.props.handleForm}>
                            Enviar respuesta
                        </button>
                    </div>
                </div>
                <br /><br />
            </div>
        )
    }
}
export default graphql(eleccion, {
    options: ({ id_estado }) => ({ variables: { estado: id_estado } }),
})(EleccionForm);
