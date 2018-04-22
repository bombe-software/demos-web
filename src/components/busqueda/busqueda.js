import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Propuestas from './propuestas';
import Eventos from './eventos'
import Politicos from './politicos';

class Busqueda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            busqueda: ""
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(event){
        this.setState({busqueda: event.target.value});
    }


    render() {
        return (
            <div>
                <TextField 
                    floatingLabelText={'Busqueda'}
                    onChange={this.onChange}
                    value={this.state.busqueda}
                />
                <br />
                <Propuestas busqueda={this.state.busqueda} />
                <Eventos busqueda={this.state.busqueda} />
                <Politicos busqueda={this.state.busqueda} />
            </div>
        )
    }
}

export default Busqueda;
