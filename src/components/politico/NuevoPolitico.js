import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from 'react-apollo';
import mutate from '../../queries/addPolitico';

class NuevoPolitico extends Component{

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


 handleSubmit(event) {
        event.preventDefault();
        const {
            nombre
        } = this.state
        console.log(this.props);
        this.props.mutate({
            variables: {
            nombre
            }
        }).then(alert('Informacion enviada'));
    }
  render() {
    return (
      <div><section className="hero is-large">
      <div className="section">
      <div className="columns">
        <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
        <div className="box"><div className="has-text-centered"><h1 className="title is-3">Crear político</h1></div><hr/>
        <form onSubmit={this.handleSubmit}>
          <div className="level">
            <div className="level-item">
              <input type="text" onChange={event => this.setState({ nombre: event.target.value })}
                    value={this.state.nombre} placeholder="Nombre del Politico" label="Nombre del Politico"/>
            </div>
          </div>

          <div className="level">
            <div className="level-item">
              <input type="text" onChange={event => this.setState({ partido: event.target.value })}
                    value={this.state.partido} placeholder="Nombre del Partido" label="Nombre del Partido" />
            </div>
          </div>

          <div className="level">
            <div className="level-item">
              <input type="text" onChange={event => this.setState({ tipo_politico: event.target.value })}
                value={this.state.tipo_politico} placeholder="Tipo" label="Tipo" />
            </div>
          </div>

          <div className="level">
            <div className="level-item">
              <input type="text" onChange={event => this.setState({ estado: event.target.value })}
                value={this.state.estado} placeholder="Estado" label="Estado" />
            </div>
          </div>




          <div className="level">
          <div className="level-item">
          <div>
            <button type="submit"  className="button is-info">
              Submit
            </button>
          </div></div></div>
        </form>
      </div></div></div></div></section>
      </div>
    );
  }
}



export default graphql(mutate)(NuevoPolitico)