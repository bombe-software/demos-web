import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { graphql, compose } from 'react-apollo';

import fetchLikesNacionalPorEstado from "./../../queries/fetchLikesNacionalPorEstado";

class Estado extends Component {
    constructor(props) {
        super(props);
        this.state = {
            r: 68,
            g: 68,
            b: 68,
            a: 1,
            bool: true
        }
    }
    componentDidUpdate(){
        if(this.state.bool){
            this.renderColor();
            this.setState({bool: false})
        }
    }

    componentWillUpdate(nextProps, nextState){
        if(this.state == nextState){
            return false;
        }
    }
    
    color() {
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
        if(this.props.fetch.likes_nacionalPorEstado.length > 0){
            return(<div>Nel prro</div>);
        } else {
        let colorArray = color.split(",");
        return {r: parseInt(colorArray[0]), g: parseInt(colorArray[1]), b:parseInt(colorArray[2]), a:1}
        }
    }

    opacar() {
        this.setState({ a: (this.state.a - 0.1) })
    }

    regresar() {
        this.setState({ a: (this.state.a + 0.1) })
    }

    renderColor(){
        if(!this.props.fetch.loading){
            if(this.props.fetch.likes_nacionalPorEstado.length == 0){
                return(<div>No hay datos</div>);
            } else if(this.props.fetch.likes_nacionalPorEstado.length < 0){
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
                };
            }
        }
    }

    render() {
        if(this.props.fetch.loading){
            return(<div>Nel prro</div>);        
        }else{
            if(this.props.fetch.likes_nacionalPorEstado.length == 0){
                return(<div>Nel prro</div>);
            } else
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
}


export default compose(
    graphql(fetchLikesNacionalPorEstado, {
        name: 'fetch',
        options: (props) => {
            return { variables: { id_estado: props.name } 
        } }
    })
)(Estado);