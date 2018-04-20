import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Estado from './estado';
import { Pie } from 'react-chartjs-2';
import { graphql, compose } from 'react-apollo';
import fetchLikesNacionalPorEstado from "./../../queries/fetchLikesNacionalPorEstado";
import Voto_nacional from "./../../mutations/voto _nacional";
import _ from "lodash";

class GraficaLateral extends Component {

      constructor(props) {
            super(props);
            this.state = {
                  estadoSelected: ""
            }
            this.handleEstadoSelected = this.handleEstadoSelected.bind(this);
      }

      generateData(names) {
            return {
                  labels: names,
                  datasets: [{
                        data: [500, 230, 140],
                        backgroundColor: [
                              'rgba(69, 196, 158, 0.9)',
                              'rgba(115, 86, 201, 0.9)',
                              'rgba(234, 83, 136, 0.9)'
                        ],
                        hoverBackgroundColor: [
                              'rgba(69, 196, 158, 1)',
                              'rgba(115, 86, 201, 1)',
                              'rgba(234, 83, 136, 1)'
                        ]
                  }]
            };
      }

      handleEstadoSelected(id) {
            console.log(id);
            this.setState({ estadoSelected: id });
      }

      renderDatos() {

            let likes = this.props.fetch.likes_nacionalPorEstado
            var usuarios = [];
            var color = [];
            var colorHover = [];
            var labels = [];
            _.map(likes, like => {
                  color.push(`rgba(${like.politico.partido.color},1)`);
                  colorHover.push(`rgba(${like.politico.partido.color},0.9)`);
                  usuarios.push(like.usuarios.length);
                  labels.push(like.politico.nombre);
            });

            console.log({
                  labels: labels,
                  datasets: [{
                        data: usuarios,
                        backgroundColor: color,
                        hoverBackgroundColor: colorHover
                  }]
            });

            return {
                  labels: labels,
                  datasets: [{
                        data: usuarios,
                        backgroundColor: color,
                        hoverBackgroundColor: colorHover
                  }]
            };
      }
      componentWillReceiveProps(nextProps) {
            nextProps.fetch.refetch();
      }
      render() {
            if (this.props.fetch.loading || this.props.mutate.loading) return <div> </div>
            console.log(this.props.fetch.likes_nacionalPorEstado);
            //console.log(this.props.mutate.votarNacional); $id_politico: ID, $id_usuario: ID, $id_estado: ID
            return (
                  <div>
                        <Pie data={this.renderDatos()} />
                  </div>
            )
      }
}

export default compose(
      graphql(Voto_nacional, {
            name: 'mutate'
      }),
      graphql(fetchLikesNacionalPorEstado, {
            name: 'fetch',
            options: (props) => { return { variables: { id_estado: props.id_estado } } }
      })
)(GraficaLateral);