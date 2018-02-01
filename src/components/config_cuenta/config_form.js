import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose, graphql } from 'react-apollo';
import updateUsuario from '../../queries/updateUsuario';

import { Form, Field } from "react-final-form";
import GenericForm from './../generic/generic_form';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';

class ConfigForm extends GenericForm {
  constructor(props) {
    super(props);
    this.state = {
      avatar: 'jaiba',
      imgAvatar: ['selected', 'none', 'none', 'none'],
      errors: []
    };
    this.updateJaiba = this.updateJaiba.bind(this);
    this.updateAnguila = this.updateAnguila.bind(this);
    this.updateChivo = this.updateChivo.bind(this);
    this.updateErizo = this.updateErizo.bind(this);
    this.setState = this.setState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

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

  async onSubmit(values) {
  const id = this.props.usuario.id;
    const {
      nombre, password
    } = values
    const avatar = this.state.avatar;
    console.log(nombre,password);
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
    console.log(this.props);
    return (
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <div className="box"> <h1 className="is-size-4">Configura tu cuenta</h1><hr />
            <Form
              onSubmit={this.onSubmit}
              validate={values => {
                const errors = {};
                if (!values.nombre) {
                  errors.nombre = "Escriba su nombre de usuario";
                }
                if (values.nombre != undefined) {
                  var ra = /^[a-z0-9]+$/i;
                  if (!ra.test(values.nombre)) {
                    errors.nombre = "Solo puede contener alfa numericos y sin espacios";
                  }
                }
              
                if (!values.password) {
                  errors.password = "Escriba su contraseña";
                }
                if (values.password != undefined) {
                  var re = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{6,}$/;
                  if (!re.test(values.password)) {
                    errors.password = "Min. 6 caractéres, 1 mayuscula, 1 minuscula y sin espacios";
                  }
                }
                if (!values.Rpassword) {
                  errors.Rpassword = "Escriba su contraseña";
                }
                if (values.password != values.Rpassword) {
                  errors.Rpassword = "Asegurese que las contraseñas coincidan";
                }
               
                return errors;
              }}
              render={({ handleSubmit, reset, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                  <div className="level">
                    <div className="level-item">
                      <Field name="nombre"
                        component={this.renderTextField}
                        hintText="Escribe tu nombre"
                        floatingLabelText="Nombre"
                      />
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item">
                      <Field name="password"
                        component={this.renderTextField}
                        hintText="Ingrese su password"
                        floatingLabelText="Password"
                      />
                    </div>
                  </div>
                  <div className="level">
                    <div className="level-item">
                      <Field name="Rpassword"
                        component={this.renderTextField}
                        hintText="Ingrese nuevamente su password"
                        floatingLabelText="Password"
                      />
                    </div>
                  </div>
                  <div>
                  <div>
                    <h2 className="is-size-5">Seleccione un avatar</h2>
                  </div><br/>
                  <div className="level">
                    <div className="level-item has-text-centered">
                      <label>
                        <input type="radio" name="imagen" />
                        <img src="./assets/img/jaiba.svg" className={this.state.imgAvatar[0] + " image is-64x64"} width="100px" height="100px" onClick={this.updateJaiba}/>
                      </label>
                    </div>
                    <div className="level-item has-text-centered">
                      <label>
                        <input type="radio" name="imagen" />
                        <img src="./assets/img/anguila.svg" className={this.state.imgAvatar[1] + " image is-64x64"} width="100px" height="100px" onClick={this.updateAnguila}/>
                      </label>
                    </div>
                    <div className="level-item has-text-centered">
                      <label>
                        <input type="radio" name="imagen" />
                        <img src="./assets/img/chivo.svg" className={this.state.imgAvatar[2] + " image is-64x64"} width="100px" height="100px" onClick={this.updateChivo}/>
                      </label>
                    </div>
                    <div className="level-item has-text-centered">
                      <label>
                        <input type="radio" name="imagen" />
                        <img src="./assets/img/hedgehog.svg" className={this.state.imgAvatar[3] + " image is-64x64"} width="100px" height="100px" onClick={this.updateErizo}/>
                      </label>
                    </div>
                  </div>
                  <br/>
                </div>
                  <div className="buttons">
                    <button type="submit" disabled={submitting}>
                      Submit
                          </button>
                  </div>
                </form>
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default graphql(updateUsuario)(ConfigForm)