import React, { Component } from "react";
import { graphql, compose } from 'react-apollo';
import  axios  from 'axios';

class Soporte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mensaje: ''
        };
    }

    render() {
        return (
            <div>
                Hola
            </div>
        );
    }
}


export default Soporte; 