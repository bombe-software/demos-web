import React, { Component } from "react";
import ConfigForm from './config_form';
import { compose, graphql } from 'react-apollo';
import fetchUsuario from '../../queries/fetchUsuario';

class Perfil extends Component {
  constructor(props) {
    super(props);
  }
  shouldComponentUpdate(nextProps){
    if(nextProps.data)
    { 
    nextProps.data.refetch();
    return true;
    }
}
  render() {
  if (this.props.data.loading) { <div>Loading...</div> }
    let {usuario} = this.props.data;
    if (JSON.stringify(usuario) == undefined) {
      return (
        <div>
          Inicia sesion para acceder a este modulo
        </div>
      );
    } else {
      const fecha = new Date(usuario.fecha_registro);
      return (
        <div className="section">
            <div className="columns">
              <div className="column is-10-widescreen is-10-desktop is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                  <h1 className="is-size-2 title">Configuración de la cuenta</h1>
              </div>
            </div>
            <div className="columns is-desktop">
              <div className="column is-12-tablet is-4-desktop is-4-widescreen is-3-fullhd is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                <div className="card">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-32x32">
                          <img src={"../../../assets/img/" + usuario.avatar + ".png"} alt="Placeholder image" />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-6">@{usuario.nombre}</p>
                        <p className="subtitle is-7">{usuario.email}</p>
                      </div>
                    </div>
                    <div className="content">
                      Fecha de registro: {`${fecha.getDay()}/${fecha.getDate()}/${fecha.getFullYear()}`}<br />
                      Localidad: {usuario.localidad.nombre}<br />
                      Puntos: {usuario.puntos}<br />
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-12-tablet is-6-desktop is-6-widescreen is-5-fullhd is-12-mobile">
                <ConfigForm
                  usuario={this.props.data.usuario}
                />
              </div>
            </div>
            <br /><br />
          
        </div>
      );
    }
  }
}

export default graphql(fetchUsuario)(Perfil)