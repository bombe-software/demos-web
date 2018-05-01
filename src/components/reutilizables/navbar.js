
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { graphql } from 'react-apollo';
import logout from "./../../mutations/especiales/logout";  
import usuario_in from "./../../queries/usuario_in.navbar";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      isUserSelected: false
    };
    this.logout = this.logout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.renderNavEnd = this.renderNavEnd.bind(this);
    this.renderModerador = this.renderModerador.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  handleClickUser(){
    this.setState(prevState => ({
      isUserSelected: !prevState.isUserSelected
    }));
  }

  logout(){
    this.props.mutate({
      refetchQueries: [{ query: usuario_in }]
    });
  }

  renderNavEnd(){
    if(this.props.data.usuario_in == undefined){
      return(
        <div>
          <div className="navbar-item">
            <Link to="/login" className="navbar-item is-light" onClick={this.handleClick}>
              Iniciar sesión
            </Link>

            <Link to="/signup" className="navbar-item" onClick={this.handleClick}>
              Registro
            </Link >

          </div>
        </div>
      );
    }else{
      return(
          <div>
          <div className="navbar-item">
            <div className="field is-grouped">
              <div className="navbar-item is-light has-dropdown is-hoverable" onClick={this.handleClick}>
                <Link to="/config_cuenta" className="navbar-item">@{this.props.data.usuario_in.nombre}</Link>
                <div className="navbar-dropdown is-right">
                  <Link to="/config_cuenta" className="navbar-item">Configuración de la cuenta</Link>
                  <Link to="/" className="navbar-item" onClick={this.logout}>Cerrar sesión</Link>
                </div>
              </div>
              <div className="navbar-item">
              <img src={`../../assets/img/${this.props.data.usuario_in.avatar}.png`} height="28" width="28"/>
              </div>	
            </div>
          </div>
          </div>
      );
    }
  }
renderModerador(){
    if(this.props.data.usuario_in != null){
      if(this.props.data.usuario_in.tipo_usuario.tipo == 'Moderador'){
        return(
            <Link to="/moderador" className="navbar-item">
              Moderador
            </Link>
        );
      }
    }
  }

  renderAdmin(){
    if(this.props.data.usuario_in != null){
      if(this.props.data.usuario_in.tipo_usuario.tipo == 'Administrador'){
        return(
            <Link to="/admin" className="navbar-item">
              Administrador
            </Link>
        );
      }
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
    if(this.props.data.loading) return <div> </div>
    return (
      //Logo de la navbar
      <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <img src="../../assets/img/demos_logo_21.png" alt="Demos" width="112" height="28"/>
            </Link>

            <div className={this.state.isToggleOn ? 'navbar-burger burger is-active' : 'navbar-burger burger'} data-target="nav-demos-menu" onClick={this.handleClick}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="nav-demos-menu" className={this.state.isToggleOn ? 'navbar-menu is-active' : 'navbar-menu'}>
            <div className="navbar-start">

              <div className="navbar-item">

                  <Link to="/elecciones" className="navbar-item" onClick={this.handleClick}>
                  Elecciones&nbsp;&nbsp;
                  <span className="icon has-text-info">
                    <i className="fa fa-line-chart" aria-hidden="true"></i>
                  </span>
                  </Link>
                  <Link to="/politicos" className="navbar-item" onClick={this.handleClick}>
                  Políticos&nbsp;&nbsp;
                  <span className="icon has-text-primary">
                  <i className="fa fa-user" aria-hidden="true"></i>
                  </span>
                  </Link>
                  <Link to="/nacional" className="navbar-item" onClick={this.handleClick}>
                  Nacional&nbsp;&nbsp;
                  <span className="icon has-text-danger">
                  <i className="icon-demos-mexico"></i>
                  </span>
                  </Link>
                  <Link to ="/busqueda" className="navbar-item" onClick={this.handleClick}>
                  Buscar&nbsp;&nbsp;
                  <span className="icon has-text-warning">
                  <i className="fa fa-search" aria-hidden="true"></i>
                  </span>
                  </Link>
                  {this.renderModerador()}
                  {this.renderAdmin()}
              </div>

            </div>
            <div className="navbar-end">
            {this.renderNavEnd()}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default graphql(logout)(graphql(usuario_in)(Navbar));