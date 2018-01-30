import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';

//Componentes
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import DatePicker from "material-ui/DatePicker";

//Queries
import fetchUsuario from './../../../queries/fetchUsuario';
import addEvento from './../../../queries/addEvento';


class EventoForm extends Component{

  constructor(props) {
    super(props);

    this.state = {
      fecha: null,
      titulo: '',
      descripcion: '',
      fuente: '',
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

  handleChangeDate(event, date) {
    this.setState({
      fecha: date,
    });
  };

  handleSubmit(event) {
    const usuario = this.props.fetchUsuario.usuario.id;
    const politico =this.props.match.params.id;
    event.preventDefault();
    const {
      fecha, titulo,
      descripcion, referencia
    } = this.state
    console.log(this.state);
    this.props.addEvento({
      variables: {
        fecha, titulo, descripcion, referencia, politico, usuario
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
    console.log(this.props.fetchUsuario);
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
                        <DatePicker
                          onChange={this.handleChangeDate}
                          value={this.state.fecha}
                          errorText={this.state.errors["fecha"]}
                          floatingLabelText={"Fecha del evento"}
                          fullWidth={true}
                        />
                      </div></div>
                    <div className="level">
                      <div className="level-item">
                        <TextField
                          onChange={event => { this.setState({ titulo: event.target.value }) }}
                          value={this.state.titulo}
                          errorText={this.state.errors["titulo"]}
                          floatingLabelText={"Título del evento"}
                          hintText={"Elegido como precandidato del PAN"}
                          floatingLabelFixed={true}
                          fullWidth={true}
                        />
                      </div></div>
                    <div className="level">
                      <div className="level-item">
                        <TextField
                          onChange={event => { this.setState({ descripcion: event.target.value }) }}
                          value={this.state.descripcion}
                          errorText={this.state.errors["descripcion"]}
                          floatingLabelText={"Descripción"}
                          hintText={"Fue elegido por votación de integrantes del mismo partido"}
                          floatingLabelFixed={true}
                          multiLine={true}
                          rows={2}
                          rowsMax={10}
                          fullWidth={true}
                        />
                      </div></div>
                    <div className="level">
                      <div className="level-item">
                        <TextField
                          onChange={event => { this.setState({ fuente: event.target.value }) }}
                          value={this.state.fuente}
                          errorText={this.state.errors["fuente"]}
                          floatingLabelText={"Fuente de consulta"}
                          floatingLabelFixed={true}
                          hintText={"www.eluniversal.com.mx"}
                          fullWidth={true}
                        />
                      </div></div>
                    <div className="level">
                      <div className="level-item">
                      <button type="submit" className="button is-primary is-medium">
                          Registrar evento
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
    }),
  graphql(fetchUsuario,
    {
      name: 'fetchUsuario'
    })
)(EventoForm);