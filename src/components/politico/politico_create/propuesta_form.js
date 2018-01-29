import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';

//Componentes
import GenericForm from '../../generic/generic_form';
import Field from '../../generic/field';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from "material-ui/DatePicker";

//Queries y Mutations
import fetchTipoPropuesta from './../../../queries/fetchTipoPropuesta';
import addPropuesta from "../../../queries/addPropuesta";
import fetchUsuario from "../../../queries/fetchUsuario";

class PropuestaForm extends GenericForm {

  constructor(props) {
    super(props);

    this.state = {
      descripcion: '',
      titulo: '',
      fecha: null,
      tipo_propuesta: '',
      referencia: '',
      errors: []
    };
    this.setState = this.setState.bind(this);
    this.error = this.error.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
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
      return (
        <MenuItem value={id} key={id} primaryText={tipo} />
      );
    });

  }

  handleChangeDate(event, date) {
    this.setState({
      fecha: date,
    });
  };

  handleSubmit(values) {
    const usuario = this.props.fetchUsuario.usuario.id;
    const politico =this.props.match.params.id;
    event.preventDefault();
    const {
      titulo, descripcion, fecha,tipo_propuesta, referencia
    } = this.state
    this.props.addPropuesta({
      variables: {
        titulo, descripcion, fecha,tipo_propuesta, referencia, usuario, politico
      }
    }).then(alert('Informacion enviada'));
  }

  render() {
    if (this.props.fetchTipoPropuesta.loading) { 
      return <div>Loading...</div>; 
    }
    return (
      <div>
        <section className="hero is-large">
          <div className="section">
            <div className="columns">
              <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                <div className="box">
                <br />
                <h1 className="title">
                  Registrar una propuesta
                </h1>
                <br />
                <p className="subtitle">
                  Registra una propuesta que haya realizado este político
                  y que no aparezca en nuestra página. Cree un título que
                  resuma la propuesta y escriba los detalles en el campo
                  descripción.
                </p>
                <br />
                  <form onSubmit={this.handleSubmit}>
                  <div className="level">
                      <div className="level-item">
                        <TextField
                          onChange={event => { this.setState({ titulo: event.target.value }) }}
                          value={this.state.titulo}
                          errorText={this.state.errors["titulo"]}
                          hintText="Aumentar la seguridad en Ecatepec"
                          floatingLabelText="Título de la propuesta"
                          floatingLabelFixed={true}
                          fullWidth={true}
                        />
                      </div>
                    </div>
                    <div className="level">
                      <div className="level-item">
                        <TextField
                          onChange={event => { this.setState({ descripcion: event.target.value }) }}
                          value={this.state.descripcion}
                          errorText={this.state.errors["descripcion"]}
                          hintText="Desplegar 1000 unidades policiacas, aumentar el número de estaciones de policía"
                          floatingLabelText="Descripción"
                          floatingLabelFixed={true}
                          multiLine={true}
                          rows={2}
                          rowsMax={10}
                          fullWidth={true}
                        />
                      </div>
                    </div>
                    <div className="level">
                      <div className="level-item">
                      
                        <SelectField
                          value={this.state.tipo_propuesta}
                          errorText={this.state.errors["tipo_propuesta"]}
                          placeholder={"Seleccione tipo de propuesta"}
                          label={"Tipo de propuesta"}
                          floatingLabelText="Categoría de la propuesta"
                          onChange={(event, index, value) => {this.setState({ tipo_propuesta: value }); console.log(this.state.tipo_propuesta)}}
                          fullWidth={true}
                        >
                        {this.renderTipoPropuesta()}
                        </SelectField>
                         
                      </div>
                    </div>
                    <div className="level">
                      <div className="level-item">
                        <TextField
                          onChange={event => { this.setState({ referencia: event.target.value }) }}
                          value={this.state.referencia}
                          errorText={this.state.errors["referencia"]}
                          hintText={"www.wikipedia.org/ejemplo"}
                          floatingLabelText="Fuente de consulta (Link)"
                          floatingLabelFixed={true}
                          fullWidth={true}
                        />
                      </div>
                    </div>
                        <DatePicker
                          onChange={this.handleChangeDate}
                          value={this.state.fecha}
                          errorText={this.state.errors["fecha"]}
                          hintText={"2017-12-03"}
                          fullWidth={true}
                          floatingLabelText="Fecha en que se realizó"
                          floatingLabelFixed={true}
                        />
                    <div className="level"></div>
                    <div className="level">
                      <div className="level-item">
                        <button type="submit" className="button is-primary is-medium">
                          Registrar propuesta
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
    }),
  graphql(addPropuesta,
    {
      name: 'addPropuesta'
    }),
  graphql(fetchUsuario,
    {
      name: 'fetchUsuario'
    }),
)(PropuestaForm);