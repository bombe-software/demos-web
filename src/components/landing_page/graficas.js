import React, { Component } from 'react';
import { Pie, Bar, Line, Polar } from 'react-chartjs-2';
import { graphql } from 'react-apollo';
import fetchGraficas from "./../../queries/fetchGraficas";

class Graficas extends Component {

    constructor(props) {
        super(props);
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

    render() {
        if (this.props.data.loading) return <div></div>
        let partidos = [
            'MORENA',
            'PAN',
            'PRI',
        ];
        console.log(this.props.data);
        return (
            <div>
                <Pie data={this.generateData(partidos)} />
                <Bar data={this.generateData(partidos)} />
                <Line data={this.generateData(partidos)} />
                <Polar data={this.generateData(partidos)} />
            </div>
        )
    }
}

export default graphql(fetchGraficas)(Graficas);