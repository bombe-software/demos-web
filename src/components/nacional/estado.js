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

    colorUpdate({r,g,b,a}) {
        this.setState({r,g,b,a});
    }

    getRGBA(color) {
        let { r, g, b, a } = color;
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }

    stringToObject(color){
        let colorArray = color.split(",");
        return {r: parseInt(colorArray[0]), g: parseInt(colorArray[1]), b:parseInt(colorArray[2]), a:1}
    }

    opacar() {
        this.setState({ a: (this.state.a - 0.1) })
    }

    regresar() {
        this.setState({ a: (this.state.a + 0.1) })
    }

    renderColor(){
        if(!this.props.fetch.loading){
            let likes = this.props.fetch.likes_nacionalPorEstado
            let preferencias = [];

            _.map(likes, like=>{
                preferencias.push({
                    color: like.politico.partido.color,
                    politico: like.politico.nombre,
                    partido: like.politico.partido.nombre,
                    likes: like.usuarios.length
                });
                
            });

            preferencias = _.sortBy(preferencias, 'likes');
            preferencias.reverse();
            let color;
            if(preferencias[0].likes>0){
                color = this.stringToObject(preferencias[0].color);
                this.colorUpdate(color);
                console.log(this.state);
            };
        }
    }

    render() {
        this.renderColor();
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