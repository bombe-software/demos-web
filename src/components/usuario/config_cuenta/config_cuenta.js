import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import ConfigForm from './config_form';
import LoadingScreen from './../../reutilizables/loading_screen';


import usuario_in from "./../../../queries/usuario_in.perfil";

class ConfigCuenta extends Component {
  render() {
    if(this.props.data.loading) return <LoadingScreen />
    const { usuario_in } = this.props.data;
    const fecha = new Date(usuario_in.fecha_registro);
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
                      <img src={"../../../assets/img/" + usuario_in.avatar + ".png"} alt="Placeholder image" />
                    </figure>
                  </div>
                  <div className="media-content">
                    <p className="title is-6">@{usuario_in.nombre}</p>
                    <p className="subtitle is-7">{usuario_in.email}</p>
                  </div>
                </div>
                <div className="content">
                  Fecha de registro: {`${fecha.getDay()}/${fecha.getDate()}/${fecha.getFullYear()}`}<br />
                  Localidad: {usuario_in.localidad.nombre}<br />
                  Puntos: {usuario_in.puntos}<br /> <br />
                  <p className="subtitle is-7">*Si un puntaje menor a -100 puntos, tu cuenta sera desactivada permanentemente. Haz solicitudes de agregar o modificar correctas y obtendras puntos, de lo contrario, perderas.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="column is-12-tablet is-6-desktop is-6-widescreen is-5-fullhd is-12-mobile">
            <ConfigForm
              usuario={this.props.data.usuario_in.id}
            />
          </div>
        </div>
        <br /><br />

      </div>
    );
  }
}

export default graphql(usuario_in)(ConfigCuenta);