import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import { RadioButtonGroup } from 'material-ui/RadioButton';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PasswordField from 'material-ui-password-field';

class GenericForm extends Component {
  constructor(props) {
    super(props);
  }

  renderTextField({ input, label, meta: { touched, error }, ...custom }) {
    return (
      <TextField hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    );
  }

  renderPasswordField({ input, label, meta: { touched, error }, ...custom }) {
    return (
      <PasswordField hintText={""}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    );
  }

  renderCheckbox({ input, label }) {
    return (
      <Checkbox label={label}
        checked={input.value ? true : false}
        onCheck={input.onChange} />
    );
  }

  renderRadioGroup({ input, ...rest }) {
    return (
      <RadioButtonGroup {...input} {...rest}
        valueSelected={input.value}
        onChange={(event, value) => input.onChange(value)} />
    );
  }

  renderDateField({input, label, meta: { touched, error }, ...custom }) {
    return (
      <DatePicker
        floatingLabelText={label}
        errorText={touched && error}
        {...custom}

        onChange={(event, value) => input.onChange(value)}
      />

    );
  }
  renderSelectField({ input, label, meta: { touched, error }, children, ...custom }) {
    return (
      <SelectField
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom} />
    );
  }

  /**
  * Es una forma de capturar cualquier error en la clase 
  * y que este no crashe el programa, ayuda con la depuracion
  * de errores
  * @method componentDidCatch
  * @const info Es más informacion acerca del error
  * @const error Es el titulo del error
  */
  componentDidCatch(error, info) {
    console.log("Error: " + error);
    console.log("Info: " + info);
  }

  render() {
    return (
      <div>
        Solo para sobreescritura
        </div>
    );
  }
}

export default GenericForm;