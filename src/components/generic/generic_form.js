import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Field from "./field"

class GenericForm extends Component {

    componentWillUpdate(props, state) {
        if (JSON.stringify(this.state) !== JSON.stringify(state)) {
            this.error(state);
        }
    }

    //Agregar Select
    renderTextField(onChange, value, error, placeholder, label) {
        return (
            <div>
                <TextField
                    hintText={placeholder}
                    floatingLabelText={label}
                    value={value}
                    onChange={onChange}
                    errorText={error}
                    id={placeholder}
                />
            </div>
        );
    }

    renderDateField(onChange, value, error, placeholder, label) {
        return (
            <div>
                <DatePicker
                    hintText="fecha"
                    floatingLabelText={label}
                    value={value}
                    onChange={event => setState({ nombre: event.target.value })}
                    errorText={error}
                    id={placeholder}
                />
            </div>
        );
    }
    renderSelectField(onChange, value, error, placeholder, label, children) {
        return (
            <div>
                <SelectField
                    hintText={placeholder}
                    floatingLabelText={label}
                    value={value}
                    onChange={event => setState({ nombre: event.target.value })}
                    errorText={error}
                    id={placeholder}
                    children= {children}
                />

            </div>
        );
    }
}
export default GenericForm;