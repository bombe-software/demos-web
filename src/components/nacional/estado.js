import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { graphql, compose } from 'react-apollo';

import fetchLikesNacionalPorEstado from "./../../queries/fetchLikesNacionalPorEstado";

class Estado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            r: 0,
            g: 0,
            b: 0,
            a: 1
        }
    }
    componentWillMount() {
        this.colorUpdate(this.color())
    }

    color() {
        /*
        let colors = [
            { r: 69, g: 196, b: 158, a: 0.9 },
            { r: 115, g: 86, b: 201, a: 0.9 },
            { r: 234, g: 83, b: 136, a: 0.9 },
        ];
        return colors[Math.floor(Math.random()*3)]
        */
       return { r: 68, g: 68, b: 68, a: 0.9 }
    }

    colorUpdate({ r, g, b, a }) {
        this.setState({ r, g, b, a })
    }

    getRGBA(color) {
        let { r, g, b, a } = color;
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }

    stringToObject(color){
        colorArray = color.split(",");
        return {r: color[0], g: cpolor[1], a:color[2]}
    }

    opacar() {
        this.setState({ a: (this.state.a - 0.1) })
    }

    regresar() {
        this.setState({ a: (this.state.a + 0.1) })
    }

    render() {
        console.log(this.props.fetch);
        /*
        _.map(propuestas, function(propuesta){
            console.log(propuesta);
            if(propuesta.politico){
                if(propuesta.politico.estado.id === usuario.localidad.id){
                    propuestasEstado.push(propuesta);
                }
            }
        });

        propuestasEstado.sort(function(a, b){
            return a.likes.length - b.likes.length;
        });

        var topPropuestas = propuestasEstado.slice(0,3).map((item)=>{
            return (
                <div className="card" key={item.id}>
                    <div className="card-content">
                        <h4>{item.titulo}</h4>
                        <p>{item.likes.length}</p>
                        <p>{item.politico.nombre}</p>
                    </div>
                </div>
            );
        });
        */
        return (
            <path
                style={{ stroke: 'white', strokeWidth: '0.5px', fill: this.getRGBA(this.state) }}
                d={this.props.d} onClick={() => this.props.handleEstadoSelected(this.props.name)}
                onMouseOver={() => this.opacar()}
                onMouseOut={() => this.regresar()}
            />
        )
    }
}


export default compose(
    graphql(fetchLikesNacionalPorEstado, {
        name: 'fetch',
        options: (props) => {
            return { variables: { id_estado: props.name } 
        } }
    })
)(Estado);