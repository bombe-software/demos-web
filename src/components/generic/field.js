import React, { Component } from 'react';

class Field extends Component{
    render(){
        return this.props.mask(
            this.props.changeState, 
            this.props.value,
            this.props.error,
            this.props.placeholder,
            this.props.label
        );
    }
}
export default Field;