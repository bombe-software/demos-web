import React, { Component } from 'react';

class SignUp extends Component {
    onSubmit(values) {
    let { avatar } = this.state;
    this.props.signupUser(values, avatar, request => {
      console.log(request);
      this.props.history.push("/confirm_email");
    });
  }


  /**
  * Realiza el renderizado de la aplicacion 
  * en base a la informacion anterior
  * @returns La cadena HTML que sera mostrada al usuario
  * @method render
  */
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <section className="hero is-large">
          <div className="section">
            <div className="columns">
              <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                <div className="box"> <h1 className="title is-3">Registro</h1><p>Ingrese la siguiente información</p><hr />
                  <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <div className="columns">

                      <div className="column">

                        <div className="level">
                          <div className="level-item">
                            <input type="text" placeholder="Nombre de Usuario" label="Nombre de Usuario"/> 
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <input type="text" placeholder="Correo electronico" label="Correo electronico"/> 
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <input type="text" placeholder="Cree contraseña" label="Cree contraseña"/>
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <input type="text" placeholder="Repita contraseña" label="Repita contraseña"/>
                          </div>
                        </div>
                        <div className="level">
                          <div className="level-item">
                            <input type="text" placeholder="Ingrese su CURP" label="Ingrese su CURP"/>
                          </div>
                        </div>
                      </div>

                      <div className="column">
                        <div>
                          <div>

                            <div className="level">
                              <div className="level-item">
                                <h2 className="is-size-5">Seleccione un avatar</h2>
                              </div>
                            </div>

                          </div><br />
                          <div className="level">
                            <div className="level-item"></div>
                            <div className="level-item has-text-centered">
                              <label>
                                <input type="radio" name="imagen" selected />
                                <img src="./assets/img/jaiba.svg" className={this.state.imgAvatar[0] + " image is-64x64"} width="100px" height="100px" onClick={this.updateJaiba} />
                              </label>
                            </div>

                            <div className="level-item has-text-centered">
                              <label>
                                <input type="radio" name="imagen" />
                                <img src="./assets/img/anguila.svg" className={this.state.imgAvatar[1] + " image is-64x64"} width="100px" height="100px" onClick={this.updateAnguila} />
                              </label>
                            </div>
                            <div className="level-item"></div>

                          </div>
                          <div className="level">

                            <div className="level-item"></div>
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
                            <div className="level-item"></div>

                          </div>
                          <br />
                        </div>
                      </div>

                    </div>
                    <br />
                    <div className="level">
                      <div className="level-item has-text-centered">
                        <button type="submit" className="button is-primary">
                          Registrarme
                      </button>
                      </div>
                    </div>

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

}

export default SignUp;