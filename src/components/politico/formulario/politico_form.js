import React from "react";
import axios from 'axios';
import { graphql } from 'react-apollo';
import { demos_krb_http } from '../../../config/deploy';

import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Form, Field } from "react-final-form";

import WaveBackground from './../../reutilizables/wave_background';
import LoadingScreen from './../../reutilizables/loading_screen';

import GenericForm from './../../reutilizables/generic_form';
import usuario_in$politico_form from './../../../queries/politico_form';
import add_politico from './../../../mutations/add/politico';


class PoliticoForm extends GenericForm {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      open: false,
      file: null,
      error: '',
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.onChange = this.onChange.bind(this)
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] })
  }
  handleOpen(){
    this.setState({ open: true });
  };

  handleClose(){
    this.setState({ open: false });
    this.props.history.push(`/politicos`);
  };

  async onSubmit(values) {
    if(this.state.file) {
    const usuario = this.props.id_usuario;
    const id_politico = this.props.match.params.id;

    if(!this.props.o){
      this.props.mutate({
        variables: {  usuario, ...values }
      }).then(response => { 
        const url = demos_krb_http +'/uploadFile';
        const formData = new FormData();
        formData.append('file',this.state.file)
        formData.append('id_solicitud',response.data.add_politico.id )
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post(url, formData ,config)
        .catch(error => {
            console.log(error.response)
        });
        this.handleOpen();
      });
      

    }else{
      this.props.o.mutate({variables: { usuario, id_politico, ...values } });
      this.handleOpen();
    }
  }
  };
  render() {
    if (this.props.data.loading) {
      return <LoadingScreen />;
    } 
    return (
      <div>
        <Dialog
          title="Tu propuesta ahora está en espera de aprobación"
          actions={[<FlatButton label="Aceptar" primary={true} keyboardFocused={false} onClick={this.handleClose} />]}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Espera la aprobación de un moderador de tu solicitud de agregar político
        </Dialog>
        <section className="hero is-large">
          <div className="section">
            <div className="columns">
              <div className="column is-6-desktop is-10-tablet is-offset-3-desktop is-offset-2-tablet">
                <div className="box" style={{padding: "48px"}}>
                  <br />
                  <h1 className="title has-text-centered">
                    Registrar un político
                </h1>
                  <br />
                  <p className="subtitle has-text-centered">
                    ¿No encuentra a un político en nuestra página?
                  Brindenos su información y solicite registrarlo para
                  que toda nuestra comunidad pueda verlo.
                </p>
                  <br />
                  <Form
                    onSubmit={this.onSubmit}
                    initialValues={!this.props.o ? {} : this.props.o.politico }
                    validate={values => {
                      const errors = {};
                      if (!values.nombre) {
                        errors.nombre = "Escriba el nombre completo";
                      }
                      if (/^\s+|\s+$/.test(values.nombre)) {
                        errors.nombre = "Escriba un nombre completo válido";
                      }
                      if (!values.partido) {
                        errors.partido = "Seleccione el partido";
                      }
                      if (!values.estado) {
                        errors.estado = "Seleccione el estado";
                      }
                      if (!values.cargo) {
                        errors.cargo = "Seleccione el cargo";
                      }
                      if (!values.grado_academico) {
                        errors.grado_academico = "Seleccione el grado academico";
                      }
                      if (!values.lugar_estudio) {
                        errors.lugar_estudio = "Seleccione el lugar de estudio";
                      }
                      if (!values.titulo) {
                        errors.titulo = "Ingrese el titulo de estudio";
                      }
                      if (!values.referencia) {
                        errors.referencia = "Escriba el link de referenica";

                      } else if (values.referencia !== undefined) {
                        var re = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/
                        if (/^\s+|\s+$/.test(values.referencia)) {
                          errors.referencia = "Link invalido";
                        } else
                          if (!re.test(values.referencia)) {
                            errors.referencia = "Los links deben empezar con http,https. (http(s)://www.demos.com)";
                          }
                      }

                      return errors;
                    }}
                    render={({ handleSubmit, reset, submitting, pristine, values }) => (
                      <form onSubmit={handleSubmit}>
                        <div className="level">
                          <div className="level-item">
                            <Field name="nombre"
                              component={this.renderTextField}
                              hintText="Juan Pérez"
                              floatingLabelText="Nombre del político"
                            />
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="partido"
                              component={this.renderSelectField}
                              hintText="Partido politico"
                              floatingLabelText="Partido"
                            >
                              {this.props.data.partidos.map(({ id, nombre }) => {
                                return <MenuItem value={id} key={id} primaryText={nombre} />
                              })}
                            </Field>
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="cargo"
                              component={this.renderSelectField}
                              hintText="Cargo politico"
                              floatingLabelText="Cargo"
                            >
                              <MenuItem value="Funcionario" key={1} primaryText={"Funcionario"} />
                              <MenuItem value="Candidato" key={2} primaryText={"Candidato"} />
                            </Field>
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="estado"
                              component={this.renderSelectField}
                              hintText="Seleccione un Estado"
                              floatingLabelText="Estado"
                            >
                              {this.props.data.estados.map(({ id, nombre }) => {
                                return <MenuItem value={id} key={id} primaryText={nombre} />
                              })}
                            </Field>
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="grado_academico"
                              component={this.renderSelectField}
                              hintText="Ing."
                              floatingLabelText="Título"
                            >
                              {this.props.data.grado_academicos.map(({ id, grado }) => {
                                return <MenuItem value={id} key={id} primaryText={grado} />
                              })}
                            </Field>
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="titulo"
                              component={this.renderTextField}
                              hintText="Derecho y Contadur[ia"
                              floatingLabelText="Estudios"
                            />
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="lugar_estudio"
                              component={this.renderSelectField}
                              hintText="Lugar de estudio"
                              floatingLabelText="Lugar de estudio"
                            >
                              {this.props.data.lugar_estudios.map(({ id, nombre }) => {
                                return <MenuItem value={id} key={id} primaryText={nombre} />
                              })}
                            </Field>
                          </div>
                        </div>

                        <div className="level">
                          <div className="level-item">
                            <Field name="referencia"
                              component={this.renderTextField}
                              hintText="Ingrese el link de referencia"
                              floatingLabelText="Enlace consultado"
                            />
                          </div>
                        </div>
                        <FlatButton
                          containerElement='label' // <-- Just add me!
                        >
                          <input type="file" onChange={this.onChange} accept=".png, .jpg, .jpeg" />
                        </FlatButton>
                        <code>{this.state.error}</code>
                        <br />
                        <div className="buttons has-text-centered">
                          <button type="submit" className="button is-primary" disabled={submitting}>
                            Registrar político
                          </button>
                        </div>
                      </form>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <WaveBackground />
      </div>
    );
  }
}

export default  graphql(add_politico)(graphql(usuario_in$politico_form)(PoliticoForm));