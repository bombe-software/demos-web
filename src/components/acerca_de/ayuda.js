import React, {Component} from 'react';

class Ayuda extends Component{

 constructor(props) {
    super(props);
    this.state = { type: 'InicioR'};
    this.updateInicioR = this.updateInicioR.bind(this);
    this.updatePeticion = this.updatePeticion.bind(this);
    this.updateInfoUsu = this.updateInfoUsu.bind(this);
    this.updateModer = this.updateModer.bind(this);
    this.updateEstad = this.updateEstad.bind(this);
    this.update = this.update.bind(this);
  }
  renderInicioR() {
    return (
      <div>
         <h2 className="title is-size-4">
         Inicio </h2>
         <p>
         Aquí, usted podrá acceder totalmente al sistema, solamente necesita ingresar su correo electrónico y su contraseña con el que se registró, en caso de olvidar su contraseña, puede pasar a “Recuperar Contraseña”, a un lado del botón de inicio
         </p>
         <br />
         <h2 className="title is-size-4">
         Registro </h2>
         <p>
         En este apartado, usted puede crear una cuenta en nuestro sistema, usted podrá participar en las estadísticas del sistema, solamente ingrese sus datos que se le piden, y a continuación, recibirá un correo para confirmar su identidad, después de esto, usted podrá disfrutar de su cuenta Demos.
         </p>
         <br />
         <h2 className="title is-size-4">
         Recuperar Contraseña </h2>
         <p>Si usted olvidó su contraseña, simplemente ingrese el correo con el que se registró, para recibir un correo con su contraseña.
         </p>
      </div>
    );
  }

    renderPeticion() {
    return (
      <div>
        <h2 className="title is-size-4">
        Solcitud de Moderador </h2>
        <p>En caso de que usted sea activo en el sistema, podrá obtener una mejor cuenta, con mejores accesos, solamente ingrese a este apartado y seleccione “Solicitud Moderador”, a continuación, ingrese el motivo por el que quiere ser Moderador (Un moderador se encarga de que realicen cambios y se maneje bien el sistema)
         </p>
         <br/>
         <h2 className="title is-size-4">
         Peticiones de Cambio </h2>
         <p>Si usted encontró información desactualizada o falsa en el sistema, en este apartado puede realizar un aviso para que se cambie esa información, solamente ingrese la información que se le pide, y a continuación, mande su solicitud, será enviada a los moderadores, quienes revisarán su solicitud.
         </p>

      </div>
    );
  }

    renderInfoUsu() {
    return (
      <div>
         <h2 className="title is-size-4">
         Configuración de la cuenta </h2>
         <p>En este apartado, usted podrá administrar opciones de su cuenta, solamente seleccione el elemento que desee cambiar, se le mostrará una pantalla, en donde le preguntaremos su nuevo cambio y si confirma los cambios.
         </p>
         <br />
         <h2 className="title is-size-4">
         Perfil de Usuario </h2>
         <p>
         Usted encontrará los datos públicos (Nombre de usuario y fecha de ingreso, etc.) que usted ingresó en el sistema.
         </p>
      </div>
    );
  }

    renderModer() {
      return (
        <div>
          <h2 className="title is-size-4">
        Moderador </h2><p>
        Si usted es  Moderador, podrá administrar las solicitudes de cambio de información que realizan, se le mostrará una lista con las solicitudes disponibles, podrá seleccionar una, al hacerlo se le mostrará detalles de esa solicitud, y podrá aceptarla o rechazarla.
        </p>
        </div>
      );
    }

      renderEstad() {
      return (
        <div>
           <h2 className="title is-size-4">
           Elecciones </h2>
           <p>En este apartado, podrá ver las estadísticas de las elecciones actuales (resultados de encuestas del sistema).
           </p>
           <br/>
           <h2 className="title is-size-4">
           Gubernatura </h2>
           <p>
           En este apartado, podrá ver las estadísticas del mandato del político ganador actual (resultados de encuestas del sistema).
           </p>
           <br/>
           <h2 className="title is-size-4">
           Encuesta </h2><p>
           En este apartado, usted podrá contestar encuestas, las cuales nos ayudan a realizar estadísticas para nuestro sistema, realizarlas de la mejor manera, significa mucho para nosotros.
           </p>
        </div>
      );
    }

  updateInicioR() {
    this.setState({ type: 'InicioR' });
  }
  updatePeticion() {
    this.setState({ type: 'Peticion' });
  }
  updateInfoUsu() {
    this.setState({ type: 'InfoUsu' });
  }
  updateModer() {
    this.setState({ type: 'Moder' });
  }
   updateEstad() {
    this.setState({ type: 'Estad' });
  }

  update() {
    let type = this.state.type;
    if (type == "InicioR") {
      return (
        <div>
          {this.renderInicioR()}
        </div>
      );
    } else if (type == "Peticion") {
      return (
        <div>
          {this.renderPeticion()}
        </div>
      );
    } else if (type == "InfoUsu") {
      return (
        <div>
          {this.renderInfoUsu()}
        </div>
      );
    } else if (type == "Moder") {
      return (
        <div>
          {this.renderModer()}
        </div>
      );
    } else if (type == "Estad") {
      return (
        <div>
          {this.renderEstad()}
        </div>
      );
    }
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
      <div className="level"></div>
        <div className="columns is-desktop">
          <div className="column is-4-widescreen is-4-desktop is-12-tablet is-12-mobile">
            <div className="panel">
                <div className="panel-heading">
                  <p>Módulos</p>
                </div>
                <ul>
                  <div className="panel-block">
                    <li className={this.state.type=="InicioR" ? 'is-active' : ''}>
                      <a onClick={this.updateInicioR}>Inicio y Registro</a>
                    </li>
                  </div>
                  <div className="panel-block">
                    <li className={this.state.type=="Peticion" ? 'is-active' : ''}>
                      <a onClick={this.updatePeticion}>Peticiones del Usuario</a>
                    </li>
                  </div>
                  <div className="panel-block">
                    <li className={this.state.type=="InfoUsu" ? 'is-active' : ''}>
                      <a onClick={this.updateInfoUsu}>Información del usuario</a>
                    </li>
                  </div>
                  <div className="panel-block">
                    <li className={this.state.type=="Moder" ? 'is-active' : ''}>
                      <a onClick={this.updateModer}>Moderador</a>
                    </li>
                  </div>
                  <div className="panel-block">
                    <li className={this.state.type=="Estad" ? 'is-active' : ''}>
                      <a onClick={this.updateEstad}>Estadisticas</a>
                    </li>
                  </div>
                </ul>

            </div>
          </div>
          <div className="column is-8-widescreen is-8-desktop is-12-tablet is-12-mobile">

                <div>
                  {this.update()}
              </div>

          </div>
        </div>
        <div className="level"><br /><br /></div>
        </div>
    );
  }
}

export default Ayuda;
