import React, { Component } from 'react';
import graphql from "graphql-tag";

/**
* @class SignUp
* @author Vicroni <drasa_tec@hotmail.com>
* @version  1.0 <10/12/17>
* @description: 
* El objetivo de la clase es  poder ser aspecto visual
* del modulo para recuperar la contraseña
*/
class RecoverPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombre: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

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
      <div>
        <section className="hero is-large">
          <div className="section">
            <div className="columns">
              <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">

                <div className="box">

                  <h1 className="title is-3">Recuperar contraseña</h1><hr />
                  <span>Ingrese el correo electronico registrado en su cuenta de Demos</span>
                  <form onSubmit={this.handleSubmit}>
                    <div className="level">
                      <div className="level-item">
                        <input type="email" label="Correo electronico" onChange={event => this.setState({ nombre: event.target.value })}
                          value={this.state.nombre} placeholder="Correo electronico" />
                      </div>
                    </div>
                    <div className="level">
                      <div className="level-item">
                        <button type="submit" className="button is-primary">
                          Cambiar
                        </button>
                      </div>
                    </div>
                  </form>
                  <br />
                  <p className="is-size-7">Para recuperar porfavor acceda a su correo</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default RecoverPassword;