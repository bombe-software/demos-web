import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Field from "./field"

class GenericForm extends Component {

    componentWillUpdate(props, state) {
        if (JSON.stringify(this.state) !== JSON.stringify(state)) {
            this.error(state);
        }
    }

    //Agregar Select
    renderTextField(setState, value, error, placeholder, label) {
        return (
            <div>
                <TextField
                    hintText={placeholder}
                    floatingLabelText={label}
                    value={value}
                    onChange={event => setState({ nombre: event.target.value })}
                    errorText={error}
                    id={placeholder}
                />
            </div>
        );
    }

    renderDateField() {
        return (
            <div>
                <DatePicker
                    hintText="Fecha"
                    floatingLabelText={label}
                    value={value}
                    onChange={event => setState({ nombre: event.target.value })}
                    errorText={error}
                    id={placeholder}
                />
            </div>
        );
    }
}
export default GenericForm;