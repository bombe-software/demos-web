import React, { Component } from 'react';

class SignUp extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            nombre: 'Nombre',
            email: 'email',
            password: 'password',
            curp: 'curp',
            avatar: 'avatar',
            localidad: 'localidad'
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const {
            nombre, email, password,
            curp, avatar, localidad
        } = this.state
        this.props.mutate({
            variables: {
                nombre, email, password,
                curp, avatar, localidad
            }
        }).then(Alert.alert('Informacion enviada'));
    }

    render() {
        return (
            <div className="is-title">Sign Up</div>
        );
    }
}

export default SignUp;