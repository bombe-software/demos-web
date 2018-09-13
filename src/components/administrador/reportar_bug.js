import React from 'react';
import { graphql } from 'react-apollo';
import { Form, Field } from "react-final-form";
import WaveBackground from "./../reutilizables/wave_background";
import NotFound from './../reutilizables/not_found';
import GenericForm from './../reutilizables/generic_form';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Loading_screen from '../reutilizables/loading_screen';

import addBug from './../../mutations/add/bug';

class ReportarBugs extends GenericForm {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            error: '',
            open: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }
    handleOpen() {
        this.setState({ open: true });
      };
    
      handleClose() {
        this.setState({ open: false });
        this.props.history.push(`/`);
      };
    
    async onSubmit(values) {
        const { url, titulo, descripcion } = values;
        this.props.mutate({
            variables: {
                url, titulo, descripcion
            },
        })
            .then( this.handleOpen())
            .catch(res => {
                const errors = res.graphQLErrors.map(error => error.message);
                const error = errors[0]
                this.setState({ error });
            });
           
    };

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
        if (this.props.data.loading) return <Loading_screen />
        if (!this.props.data.usuario_in) {
            return (
                <NotFound />
            );
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
                    Espera la aprobación de un moderador de tu solicitud para agregar un evento al historial del político.
        </Dialog>
                <section className="hero is-large">
                    <div className="section">
                        <div className="columns">
                            <div className="column is-6-desktop is-8-tablet is-offset-3-desktop is-offset-2-tablet">
                                <div className="box"><h1 className="title is-2">Reporte un bug</h1><hr />
                                    <Form
                                        onSubmit={this.onSubmit}
                                        validate={values => {
                                            const errors = {};
                                            if(!values.titulo){
                                                errors.titulo = "Ingrese un titulo"
                                            }
                                            if(!values.descripcion){
                                                errors.descripcion = "Ingrese una descripcion"
                                            }
                                            if (!values.url) {
                                                errors.url = "Escriba la url donde se encuentre el bug u error";
                        
                                              } else if (values.url != undefined) {
                                                var re = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/
                                                if (/^\s+|\s+$/.test(values.url)) {
                                                  errors.url = "Link invalido";
                                                } else
                                                  if (!re.test(values.url)) {
                                                    errors.url = "Los links deben empezar con http,https. (http(s)://www.demos-web/politicos.com)";
                                                  }
                                              }

                                            return errors;
                                        }}

                                        render={({ handleSubmit, reset, submitting, pristine, values }) => (
                                            <form onSubmit={handleSubmit}>
                                                <div className="level">
                                                    <div className="level-item">
                                                        <Field name="titulo"
                                                            component={this.renderTextField}
                                                            hintText="Escribe su titulo"
                                                            floatingLabelText="Titulo"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="level">
                                                    <div className="level-item">
                                                        <Field name="descripcion"
                                                            component={this.renderTextArea}
                                                            floatingLabelText="Descripcion"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="level">
                                                    <div className="level-item">
                                                        <Field name="url"
                                                            component={this.renderTextField}
                                                            hintText="Ingrese su url"
                                                            floatingLabelText="Url"
                                                        />
                                                    </div>
                                                </div>
                                                <code>
                                                    {this.state.error}
                                                </code>
                                                <br />
                                                <div className="buttons has-text-centered">
                                                    <button type="submit" className="button is-primary" disabled={submitting}>
                                                        Reportar Bug
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

export default graphql(addBug)(ReportarBugs);