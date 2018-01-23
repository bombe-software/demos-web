import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import GenericForm from './../generics/form';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { update_user } from "../../actions";

class ConfigForm extends GenericForm {
  constructor(props) {
    super(props);
    this.state = {
       avatar: 'jaiba',
       imgAvatar: ['selected','none','none','none']
    };
    this.updateJaiba = this.updateJaiba.bind(this);
    this.updateAnguila = this.updateAnguila.bind(this);
    this.updateChivo = this.updateChivo.bind(this);
    this.updateErizo = this.updateErizo.bind(this);
  }

  updateJaiba(){
    this.setState({
      avatar: "jaiba",
      imgAvatar: ['selected','none','none','none']
     })
  }
  updateAnguila(){
    this.setState({
      avatar: "anguila",
      imgAvatar: ['none','selected','none','none']
     })
  }
  updateChivo(){
    this.setState({
      avatar: "chivo",
      imgAvatar: ['none','none','selected','none']
     })
  }
  updateErizo(){
    this.setState({
      avatar: "bussines",
      imgAvatar: ['none','none','none','selected']
     })
  }

  onSubmit(values) {
    let { avatar } =  this.state;
    let { user } =  this.props;
    this.props.update_user(values, avatar, user.id_usuario , request => {
      location.reload();
    });
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
    const { handleSubmit } = this.props;
    return(
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <div className="box"> <h1 className="is-size-4">Configura tu cuenta</h1><hr/>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="usuario" component={this.renderTextField} label="Nombre de usuario:" />
            <Field name="password" component={this.renderPasswordField} label="Cree una contraseña:" />
            <Field name="Rpassword" component={this.renderPasswordField} label="Repita su contraseña:" />
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

function validate(values) {
  const errors = {};

  if (!values.usuario) {
    errors.usuario = "Escriba su nombre de usuario";
  }
   if(values.usuario != undefined){
     var ra = /^[a-z0-9]+$/i;
    if (!ra.test(values.usuario)) {
                errors.usuario = "Solo puede contener alfa numericos y sin espacios";
            }
          }  
  if (!values.password) {
    errors.password = "Escriba su contraseña";
  }
  if(values.password != undefined){
    var re = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})\S{6,}$/;
    if(!re.test(values.password)){
      errors.password ="Min. 6 caractéres, 1 mayuscula, 1 minuscula y sin espacios";
    }
  }
  if (!values.Rpassword) {
    errors.Rpassword = "Repita su contraseña";
  }

  if (values.password!=values.Rpassword) {
    errors.Rpassword = "Asegurese que las contraseñas coincidan";
  }


  return errors;
}

export default reduxForm({
  validate,
  form: "ConfigForm"
})(connect(null, { update_user })(ConfigForm));