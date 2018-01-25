import React, { Component } from "react";
import { Link } from "react-router-dom";
import fetchTipoPropuesta from './../../../queries/fetchTipoPropuesta';
import { compose, graphql } from 'react-apollo';
import Field from '../../generic/field';
import GenericForm from '../../generic/generic_form';
import MenuItem from 'material-ui/MenuItem';

class PropuestaForm extends GenericForm {

  constructor(props) {
    super(props);

    this.state = {
      descripcion: '',
      titulo: '',
      fecha: {},
      tipoPropuesta: '',
      fuente: '',
      errors: []
    };
          this.setState = this.setState.bind(this);
          this.error = this.error.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    error(values) {
    const errors = [];
    //Poner validaciones

    this.setState({ errors });
  }

  renderTipoPropuesta() {
    const array = [{ id: '0', tipo: 'Opcion default' }]
      .concat(this.props.fetchTipoPropuesta.tipos_propuesta);
    return array.map(({ id, tipo }) => {
    console.log(tipo);
      return (
        
          <MenuItem value={id} primaryText={tipo} key={id} />
      );
    });

  }

  handleSubmit(values) {


  }

  render() {
    if (this.props.fetchTipoPropuesta.loading) { return <div>Loading...</div>; }
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
                        <Field
                          changeState={event => { this.setState({ titulo: event.target.value }) }}
                          mask={this.renderTextField}
                          value={this.state.titulo}
                          error={this.state.errors["titulo"]}
                          placeholder={"titulo"}
                          label={"Escribe el titulo"}
                        />
                      </div>
                    </div>
                    <div className="level">
                      <div className="level-item">
                        <Field
                          changeState={event => { this.setState({ descripcion: event.target.value }) }}
                          mask={this.renderTextField}
                          value={this.state.descripcion}
                          error={this.state.errors["descripcion"]}
                          placeholder={"descripcion"}
                          label={"Escribe la descripcion"}
                        />
                      </div>
                    </div>
                    <div className="level">
                      <div className="level-item">
                        <Field
                          changeState={event => { this.setState({ fecha: event.target.value }) }}
                          mask={this.renderDateField}
                          value={this.state.fecha}
                          error={this.state.errors["fecha"]}
                          placeholder={"Seleccione fecha"}
                          label={"Seleccione fecha"}
                        />
                      </div>
                    </div>
                    <div className="level">
                      <div className="level-item">
                      
                        <Field
                          mask={this.renderSelectField}
                          error={this.state.errors["tipoPropuesta"]}
                          placeholder={"Seleccione tipo de propuesta"}
                          label={"Tipo de propuesta"}
                           >
                          {this.renderTipoPropuesta()}
                           </Field>
                         
                      </div></div>
                    <div className="level">
                      <div className="level-item">
                        <Field
                          changeState={event => { this.setState({ fuente: event.target.value }) }}
                          mask={this.renderTextField}
                          value={this.state.fuente}
                          error={this.state.errors["fuente"]}
                          placeholder={"Seleccione fuente"}
                          label={"Escriba la fuente"}
                        />
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