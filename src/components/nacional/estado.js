import React, { Component } from 'react';
import { Link } from "react-router-dom";

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
        let colors = [
            { r: 69, g: 196, b: 158, a: 0.9 },
            { r: 115, g: 86, b: 201, a: 0.9 },
            { r: 234, g: 83, b: 136, a: 0.9 },
        ];
        return colors[Math.floor(Math.random()*3)]
    }

    colorUpdate({ r, g, b, a }) {
        this.setState({ r, g, b, a })
    }

    getRGBA(color) {
        let { r, g, b, a } = color;
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    }

    opacar() {
        this.setState({ a: (this.state.a - 0.1) })
    }

    regresar() {
        this.setState({ a: (this.state.a + 0.1) })
    }

    render() {
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


export default Estado;