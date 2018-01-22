import React, { Component } from "react";
import { Link } from "react-router-dom";
import { compose } from 'react-apollo';
import { graphql } from 'react-apollo';

class ConfigCuentaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
       avatar: 'jaiba',
       imgAvatar: ['selected','none','none','none'],
       usuario: '',
       password: '',
       Rpassword: ''
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

  onSubmit(event) {

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
    return(
      <div className="columns">
        <div className="column is-8 is-offset-2">
          <div className="box"> <h1 className="is-size-4">Configura tu cuenta</h1><hr/>
          <form onSubmit={this.onSubmit}>
             <input type="text" onChange={event => this.setState({ usuario: event.target.value })}
                        value={this.state.usuario} placeholder='Ingrese nuevo nombre de usuario' />
             <input type="text" onChange={event => this.setState({ password: event.target.value })}
                        value={this.state.password} placeholder='Ingrese password' />
             <input type="text" onChange={event => this.setState({ Rpassword: event.target.value })}
                        value={this.state.Rpassword} placeholder='Repita password' />
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

export default ConfigCuentaForm;