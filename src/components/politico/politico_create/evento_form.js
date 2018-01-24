import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from 'react-apollo';
import { graphql } from 'react-apollo';
import addEvento from './../../../queries/addEvento';

class EventoForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fecha: '',
      titulo: '',
      descripcion: '',
      fuente:''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(this.state);
 event.preventDefault();
    const {
        fecha, titulo,
        descripcion,fuente
    } = this.state
    this.props.addEvento({
      variables: {
        fecha, titulo, descripcion
      }
    }).then(alert('Informacion enviada'));
  
  }

  /**
  * Es una forma de capturar cualquier error en la clase 
  * y que este no crashe el programa, ayuda con la depuracion
  * de errores
  * @method componentDidCatch
  * @const info Es más informacion acerca del error
  * @const error Es el titulo del error
  */
  render() {

    return (
      <div>
    
        <section className="hero is-large">
          <div className="section">
            <div className="columns">
              <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                <div className="box">
                  <div className="has-text-centered"><h1 className="title is-3">Registrar evento</h1></div>
                  <hr />
        <form onSubmit={this.handleSubmit}>
        <div className="level">
          <div className="level-item">

            <input type="text" onChange={event => this.setState({ fecha: event.target.value })}
                        value={this.state.fecha} placeholder='Seleccione la fecha' />
            </div></div>
            <div className="level">
              <div className="level-item">
             <input type="text" onChange={event => this.setState({ titulo: event.target.value })}
                        value={this.state.titulo} placeholder='Escriba el titulo' />
            </div></div>
            <div className="level">
              <div className="level-item">      
            <input type="text" onChange={event => this.setState({ descripcion: event.target.value })}
                        value={this.state.descripcion } placeholder="Escriba la descripcion" />
            </div></div>
            <div className="level">
              <div className="level-item">      
            <input type="text" onChange={event => this.setState({ fuente: event.target.value })}
                        value={this.state.fuente } placeholder="Escriba la fuente" />
            </div></div>
            <div className="level">
              <div className="level-item">
            <button type="submit" className="button is-info">
              Submit
            </button>
            </div></div>
        </form>
        </div></div></div></div></section>
      </div>
    );
  }
}

export default compose(
graphql(addEvento,
    {
      name: 'addEvento'
    })
)(EventoForm);