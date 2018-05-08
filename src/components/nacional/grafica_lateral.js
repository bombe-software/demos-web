import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Estado from './estado';
import { Pie } from 'react-chartjs-2';
import { graphql, compose } from 'react-apollo';
import likes_nacional_by_estado from "./../../queries/likes_nacional_by_estado";
import _ from "lodash";
import { defaultCipherList } from 'constants';

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
            this.setState({ estadoSelected: id });
      }

      renderDatos() {
            let likes = this.props.data.like_nacionals_by_id_estado
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
            return {
                  labels: labels,
                  datasets: [{
                        data: usuarios,
                        backgroundColor: color,
                        hoverBackgroundColor: colorHover
                  }]
            };
      }
      render() {
            if (this.props.data.loading) return <div>juiju</div>
            return (
                  <div>
                        jujuju
                        <Pie data={this.renderDatos()} />
                  </div>
            )
      }
}
export default graphql(likes_nacional_by_estado, 
{
      options: (props) => { return { variables: { id_estado: props.id_estado } } }
})(GraficaLateral)
