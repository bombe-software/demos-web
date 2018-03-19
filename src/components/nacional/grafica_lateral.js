import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Estado from './estado';
import { Pie } from 'react-chartjs-2';
import { graphql } from 'react-apollo';
import fetchEstado from "./../../queries/fetchEstado";

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

      handleEstadoSelected(id){
            console.log(id);
            this.setState({estadoSelected: id});
      }

      render() {
          if(this.props.fetchEstado.loading) return <div> </div>
            let partidos = [
                  'MORENA',
                  'PAN',
                  'PRI',
              ];
            return (
                  <div>
                        {this.props.fetchEstado.estado.nombre}
                        <Pie data={this.generateData(partidos)} />
                  </div>
            )
      }
}


export default graphql(fetchEstado, {
    name: "fetchEstado",
    options: (props) => { return { variables: { id: props.id_estado } } }
})(GraficaLateral);
