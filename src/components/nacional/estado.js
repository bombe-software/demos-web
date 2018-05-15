import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { graphql} from 'react-apollo';
import LoadingScreen from './../reutilizables/loading_screen';
import likes_nacional_by_estado from "./../../queries/likes_nacional_by_estado";

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

    componentWillUpdate(nextProps){
       if(this.props != nextProps){
            this.setState({ bool: true })
       }
    }

    componentDidUpdate() {
        if (this.state.bool) {
            this.renderColor();
            this.setState({ bool: false })
        }
    }

    color() {
        return { r: 68, g: 68, b: 68, a: 0.9 }
    }

    colorUpdate({ r, g, b, a }) {
        this.setState({ r, g, b, a });
    }

    getRGBA(color) {
        let { r, g, b, a } = color;
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }

    stringToObject(color) {
            let colorArray = color.split(",");
            return { r: parseInt(colorArray[0]), g: parseInt(colorArray[1]), b: parseInt(colorArray[2]), a: 1 }
    }

    opacar() {
        this.setState({ a: (this.state.a - 0.1) })
    }

    regresar() {
        this.setState({ a: (this.state.a + 0.1) })
    }

    renderColor() {
        if (!this.props.data.loading) {
            if (this.props.data.like_nacionals_by_id_estado.length != 0) {
                let likes = this.props.data.like_nacionals_by_id_estado
                let preferencias = [];
                _.map(likes, like => {
                    preferencias.push({
                        color: like.politico.partido.color,
                        likes: like.usuarios.length
                    });
                });
                preferencias = _.sortBy(preferencias, 'likes');
                preferencias.reverse();
                
                let color;
                if (preferencias[0].likes > 0) {
                    color = this.stringToObject(preferencias[0].color);
                    this.colorUpdate({ ...color});
                };
            }
        }
    }
    render() {
        if(this.props.data.loading) return <LoadingScreen />;
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


export default graphql(likes_nacional_by_estado, {
    options: (props) => {
        return { variables: { id_estado: props.name } 
    } } }
)(Estado);