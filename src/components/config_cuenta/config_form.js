import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import Field from './../generic/field';
import GenericForm from './../generic/generic_form';
import updateUsuario from '../../queries/updateUsuario'
class ConfigForm extends GenericForm {
  constructor(props) {
    super(props);
    this.state = {
      nombre: '',
      password: '',
      Rpassword: '',
      avatar: 'jaiba',
      imgAvatar: ['selected', 'none', 'none', 'none'],
      errors: []
    };
    this.updateJaiba = this.updateJaiba.bind(this);
    this.updateAnguila = this.updateAnguila.bind(this);
    this.updateChivo = this.updateChivo.bind(this);
    this.updateErizo = this.updateErizo.bind(this);
    this.setState = this.setState.bind(this);
    this.error = this.error.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

  }
  error(values) {
    const errors = [];
    //Poner validaciones

    this.setState({ errors });
  }

  updateJaiba() {
    this.setState({
      avatar: "jaiba",
      imgAvatar: ['selected', 'none', 'none', 'none']
    })
  }
  updateAnguila() {
    this.setState({
      avatar: "anguila",
      imgAvatar: ['none', 'selected', 'none', 'none']
    })
  }
  updateChivo() {
    this.setState({
      avatar: "chivo",
      imgAvatar: ['none', 'none', 'selected', 'none']
    })
  }
  updateErizo() {
    this.setState({
      avatar: "bussines",
      imgAvatar: ['none', 'none', 'none', 'selected']
    })
  }

  onSubmit(event) {
    event.preventDefault();
    const id = this.props.usuario.id;
    const {
      nombre,password,avatar
    } = this.state
    this.props.mutate({
      variables: {
        id, nombre, password, avatar
      }
    }).then(alert('Informacion enviada'));
    location.reload();
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
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <div className="box"> <h1 className="is-size-4">Configura tu cuenta</h1><hr />
            <form onSubmit={this.onSubmit}>
              <Field
                changeState={event => { this.setState({ nombre: event.target.value }) }}
                mask={this.renderTextField}
                value={this.state.nombre}
                error={this.state.errors["nombre"]}
                placeholder={"nombre"}
                label={"Escriba su nombre"}
              />
              <Field
                changeState={event => { this.setState({ password: event.target.value }) }}
                mask={this.renderTextField}
                value={this.state.password}
                error={this.state.errors["password"]}
                placeholder={"password"}
                label={"Escribe su password"}
              />
              <Field
                changeState={event => { this.setState({ Rpassword: event.target.value }) }}
                mask={this.renderTextField}
                value={this.state.Rpassword}
                error={this.state.errors["Rpassword"]}
                placeholder={"Repita password"}
                label={"Repita su password"}
              />
              <div>
                <div>
                  <h2 className="is-size-5">Seleccione un avatar</h2>
                </div><br />
                <div className="level">
                  <div className="level-item has-text-centered">
                    <label>
                      <input type="radio" name="imagen" />
                      <img src="./assets/img/jaiba.svg" className={this.state.imgAvatar[0] + " image is-64x64"} width="100px" height="100px" onClick={this.updateJaiba} />
                    </label>
                  </div>
                  <div className="level-item has-text-centered">
                    <label>
                      <input type="radio" name="imagen" />
                      <img src="./assets/img/anguila.svg" className={this.state.imgAvatar[1] + " image is-64x64"} width="100px" height="100px" onClick={this.updateAnguila} />
                    </label>
                  </div>
                  <div className="level-item has-text-centered">
                    <label>
                      <input type="radio" name="imagen" />
                      <img src="./assets/img/chivo.svg" className={this.state.imgAvatar[2] + " image is-64x64"} width="100px" height="100px" onClick={this.updateChivo} />
                    </label>
                  </div>
                  <div className="level-item has-text-centered">
                    <label>
                      <input type="radio" name="imagen" />
                      <img src="./assets/img/hedgehog.svg" className={this.state.imgAvatar[3] + " image is-64x64"} width="100px" height="100px" onClick={this.updateErizo} />
                    </label>
                  </div>
                </div>
                <br />
              </div>
              <div className="level">
                <div className="level-item has-text-centered">
                  <button type="submit" className="button is-primary">
                    Submit
                </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(updateUsuario)(ConfigForm)