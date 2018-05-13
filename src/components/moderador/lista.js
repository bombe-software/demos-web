import React, { Component } from "react";
import _ from 'lodash';

import Detalle from './detalle';

class Lista extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null
        }

        this.seleccionar = this.seleccionar.bind(this);
        this.listener = this.listener.bind(this)
    }

    seleccionar(id) {
        this.setState({ id });
    }

    renderPropuestaSelected() {
        if (this.state.id) {
            return <Detalle o={_.find(this.props.lista, { 'id': this.state.id })} tipo={this.props.tipo} />
        } else {
            return (
                <div className="card">
                    <div className="card-content">
                        <div className="section has-text-centered">
                            Selecciona un{(this.props.tipo[this.props.tipo.length - 1] == 'o') ? '' : 'a'} {this.props.tipo.toLowerCase()}
                        </div>
                    </div>
                </div>
            );
        }
    }

    listener(o, id) {
        return () => {
            if (o) {
                this.props.aceptar(id);
                this.setState({ id: null });
            } else {
                this.props.denegar(id);
                this.setState({ id: null });
            }
        }
    }

    renderList() {
        return this.props.lista.map(({ id, titulo, usuario, nombre }) => {
            /**
             * Quitar el true
             */
            if (this.props.id_usuario != usuario.id || true) {
                return (
                    <div key={id}>
                        <div className="panel-block"  >
                            <span className="panel-icon">
                                <a className="is-primary" onClick={this.listener(true, id)}>
                                    <i className="fa fa-check"></i>
                                </a> &nbsp;&nbsp;&nbsp;
                </span>
                        <span className="panel-icon">
                            <a className="is-danger" style={{ color: 'red' }} onClick={this.listener(false, id)}>
                                <i className="fa fa-times"></i>
                            </a>
                        </span>
                        <a onClick={() => { this.seleccionar(id) }}
                            style={{ color: 'inherit', textDecoration: 'none' }}
                        >{titulo || nombre}</a>
                    </div>
                    </div >
                )
    }
});
    }

render() {
    return (
        <div className="columns is-desktop">
            <div className="column is-5-widescreen is-5-desktop is-12-tablet">
                <div>
                    <div className="panel">
                        <div className="panel-heading">{this.props.tipo + 's:'}</div>
                        {this.renderList()}
                    </div>
                </div>
            </div>
            <div className="column is-7-widescreen is-7-desktop is-12-tablet">
                {this.renderPropuestaSelected()}
            </div>
        </div>
    );
}
}
export default Lista;