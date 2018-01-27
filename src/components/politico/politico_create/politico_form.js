import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from 'react-apollo';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import GenericForm from '../../generic/generic_form';
import Field from '../../generic/field';
import addPolitico from './../../../queries/addPolitico';
import fetchPartidos from './../../../queries/fetchPartidos';

import fetchUsuario from './../../../queries/fetchUsuario';
import fetchEstados from './../../../queries/fetchEstados';
import fetchGradoAcad from './../../../queries/fetchGradoAcad';
import fetchLugarEstudio from './../../../queries/fetchLugarEstudio';

import { compose } from 'react-apollo';

class PoliticoForm extends GenericForm {

  constructor(props) {
    super(props);

    this.state = {
      nombre: '',
      partido: '',
      cargo: '',
      estado: '',
      titulo: '',
      grado_academico: '',
      lugar_estudio: '',
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

  handleSubmit(event) {
   
    const idUsuario = this.props.fetchUsuario.usuario.id;
    console.log(idUsuario);
    event.preventDefault();
    const {
      nombre, cargo, estado,titulo,grado_academico,lugar_estudio, partido
    } = this.state
    this.props.addPolitico({
      variables: {
        nombre, cargo, partido,estado, lugar_estudio, grado_academico, titulo,idUsuario
      }
    }).then(alert('Informacion enviada'));
  }

  render() {
    if (this.props.fetchgrado_academico.loading || this.props.fetchLugarEstudio.loading || this.props.fetchPartidos.loading || this.props.fetchEstados.loading) { return <div>Loading...</div>; }
 
    return (
      <div><section className="hero is-large">
        <div className="section">
          <div className="columns">
            <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
              <div className="box"><div className="has-text-centered"><h1 className="title is-3">Crear político</h1></div><hr />
                <form onSubmit={this.handleSubmit}>
                  <div className="level">
                    <div className="level-item">
                      <Field
                        changeState={event => { this.setState({ nombre: event.target.value }) }}
                        mask={this.renderTextField}
                        value={this.state.nombre}
                        error={this.state.errors["nombre"]}
                        placeholder={"Nombre del politico"}
                        label={"Escriba el nombre del politico"}
                      />
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item">
                      <SelectField
                        errorText={this.state.errors["partido"]}
                        value={this.state.partido}
                        onChange={(event, index, value) => this.setState({ partido: value })}
                        floatingLabelText="Partido"
                        fullWidth={true}
                      >
                        {this.props.fetchPartidos.partidos.map(({ id, nombre }) => {
                          return <MenuItem value={id} key={id} primaryText={nombre} />
                        })}
                      </SelectField>
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item">
                      <SelectField
                        errorText={this.state.errors["cargo"]}
                        value={this.state.cargo}
                        onChange={(event, index, value) => this.setState({ cargo: value })}
                        floatingLabelText="Cargo"
                        fullWidth={true}
                      >
                        <MenuItem value="Politico" key={1} primaryText={"Politico"} />
                        <MenuItem value="Candidato" key={2} primaryText={"Candidato"} />
                      </SelectField>
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item">
                      <SelectField
                        fullWidth={true}
                        errorText={this.state.errors["estado"]}
                        value={this.state.estado}
                        floatingLabelText="Estado"
                        onChange={(event, index, value) => this.setState({ estado: value })}>
                        {this.props.fetchEstados.estados.map(({ id, nombre }) => {
                          return <MenuItem value={id} key={id} primaryText={nombre} />
                        })}
                      </SelectField>
                    </div>
                  </div>
                  <div>
                    Estudios
                    </div>
                  <div className="level">
                    <div className="level-item">
                      <Field
                        changeState={event => { this.setState({ titulo: event.target.value }) }}
                        mask={this.renderTextField}
                        value={this.state.titulo}
                        error={this.state.errors["titulo"]}
                        placeholder={"titulo"}
                        label={"Escriba el titulo"}
                      />
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item">
                      <SelectField
                        value={this.state.grado_academico}
                        errorText={this.state.errors["grado_academico"]}
                        floatingLabelText="Grado Academico"
                        onChange={(event, index, value) => this.setState({ grado_academico: value })}
                        fullWidth={true}
                      >
                        {this.props.fetchgrado_academico.grados_academico.map(({ id, grado }) => {
                          return <MenuItem value={id} key={id} primaryText={grado} />
                        })}
                      </ SelectField>
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item">
                      <SelectField
                        fullWidth={true}
                        value={this.state.lugar_estudio}
                        errorText={this.state.errors["lugar_estudio"]}
                        floatingLabelText="Lugar de estudio"
                        onChange={(event, index, value) => this.setState({ lugar_estudio: value })}
                      >
                        {this.props.fetchLugarEstudio.lugares_estudio.map(({ id, nombre }) => {
                          return <MenuItem value={id} key={id} primaryText={nombre} />
                        })}
                      </SelectField>
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item">
                      <div>
                        <button type="submit" className="button is-info">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div></div></div></div></section>
      </div>
    );
  }
}

export default compose(
  graphql(addPolitico, {
    name: 'addPolitico'
  }),
  graphql(fetchPartidos, {
    name: 'fetchPartidos'
  }),
  graphql(fetchEstados, {
    name: 'fetchEstados'
  }),
  graphql(fetchGradoAcad, {
    name: 'fetchgrado_academico'
  }),
  graphql(fetchLugarEstudio, {
    name: 'fetchLugarEstudio'
  }),
  graphql(fetchUsuario, {
    name: 'fetchUsuario'
  })

)(PoliticoForm);

