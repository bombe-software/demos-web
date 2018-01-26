import React, { Component } from "react";
import ConfigForm from './config_form';
import { compose, graphql } from 'react-apollo';
import fetchUsuario from '../../queries/fetchUsuario';


class Perfil extends Component {
  constructor(props) {
    super(props);
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
      return (
        <div className="columns">
          <div className="column is-8 is-10-mobile is-offset-2 is-offset-1-mobile">
            <br />
            <div className="columns">
              <div className="column is-4 is-12-mobile">
                <div className="card">
                  <div className="card-content">
                    <div className="media">
                      <div className="media-left">
                        <figure className="image is-48x48">
                          <img src={"../../../assets/img/" + usuario.avatar + ".png"} alt="Placeholder image" />
                        </figure>
                      </div>
                      <div className="media-content">
                        <p className="title is-4">@{usuario.nombre}</p>
                        <p className="subtitle is-7">{usuario.email}</p>
                      </div>
                    </div>
                    <div className="content">
                      Fecha de registro: {usuario.fecha_registro}<br />
                      Localidad: {usuario.localidad}<br />
                      Puntos: {usuario.puntos}<br />
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-8 is-12-mobile">
                <ConfigForm
                  usuario={this.props.data.usuario}
                />
              </div>
            </div>
            <br /><br />
          </div>
        </div>
      );
    }
  }
}

export default graphql(fetchUsuario)(Perfil)