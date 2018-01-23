import React, { Component } from "react";
import { Link } from "react-router-dom";
import fetchTipoPropuesta from './../../../queries/fetchTipoPropuesta';
import { compose, graphql } from 'react-apollo';

class PropuestaForm extends Component {

  constructor(props) {
    super(props);
   
    this.state = {
      descripcion: '',
      fecha: '',
      tipoPropuesta: ''
    };
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  renderTipoPropuesta(evento){
    const array = [{ id: '0', tipo: 'Opcion default' }]
    .concat(this.props.fetchTipoPropuesta.tipos_propuesta);
    return array.map(({ id, tipo }) => {
    return (
    <option value={id} key={id} className="collection-item">
    {tipo}
    </option>
      );
    });

  }



  handleSubmit(values) {
  
  }


  render() {
     if(this.props.fetchTipoPropuesta.loading){ return <div>Loading...</div>;}
    return (
      <div>
        <section className="hero is-large">
          <div className="section">
            <div className="columns">
              <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                <div className="box">
                  <div className="has-text-centered"><h1 className="title is-3">Crear propuesta</h1></div>
                  <hr />
                  <form onSubmit={this.handleSubmit}>

                    <div className="level">
                      <div className="level-item">
                        <input type="text" placeholder="Nombre de la propuesta" onChange={event => this.setState({ descripcion: event.target.value })}
                        value={this.state.descripcion} />
                      </div>
                    </div>
                    <div className="level">
                      <div className="level-item">
                    <input type="text" placeholder="Fecha" onChange={event => this.setState({ fecha: event.target.value })}
                        value={this.state.fecha} />
                    </div></div>
                    <div className="level">
                      <div className="level-item">
                          
                    <select onChange={event => this.setState({ tipoPropuesta: event.target.value })}>
                        {this.renderTipoPropuesta(event)}
                      </select>
                    </div></div>
                    <div className="level">
                      <div className="level-item">
                    <button type="submit" className="button is-info">
                      Submit
                    </button>
                    </div></div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}



export default compose(
graphql(fetchTipoPropuesta,
    {
      name: 'fetchTipoPropuesta'
    })
)(PropuestaForm);