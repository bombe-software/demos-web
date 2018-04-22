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

    renderSecciones() {
        if(this.state.busqueda!==""){
            return (
                <div>
                <div className="columns is-desktop">
                <div className="column is-4-widescreen is-4-desktop is-12-tablet is-12-mobile has-text-centered">                    
                    <h2 className="is-size-4 title">
                        <i className="fa fa-user" aria-hidden="true"></i>
                        &nbsp;
                        Políticos
                    </h2>
                    <Politicos busqueda={this.state.busqueda} />
                </div>
                <div className="column is-4-widescreen is-4-desktop is-12-tablet is-12-mobile has-text-centered">
                    <h2 className="is-size-4 title">
                        <i className="fa fa-list" aria-hidden="true"></i>
                        &nbsp;
                        Propuestas
                    </h2>
                    <Propuestas busqueda={this.state.busqueda} />
                </div>
                <div className="column is-4-widescreen is-4-desktop is-12-tablet is-12-mobile has-text-centered">   
                    <h2 className="is-size-4 title">
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        &nbsp;
                        Eventos
                    </h2>
                    <Eventos busqueda={this.state.busqueda} />
                </div>
                </div>
                </div>
            );
        } else return(<div className="level">
            <div className="level-item">
                Ingresa una búsqueda
            </div>
        </div>);
    }

    render() {
        return (
            <div>
                <div className="section">
                <div className="columns">
                <div className="column is-10-widescreen is-10-desktop is-12-tablet is-12-mobile is-offset-1-desktop is-offset-1-widescreen is-offset-2-fullhd">
                    
                <div className="level">
                    <div className="level-left">
                        <div className="level-element">
                            <h1 className="is-size-2 title">Búsqueda</h1>
                            {this.state.busqueda!=="" ? <div><p className="is-size-5 subtitle">
                            Resultados para: "{this.state.busqueda}"
                            </p></div>
                            : 
                            <p></p>}
                        </div>
                    </div>
                    <div className="level-right">
                        
                        <div className="level-element">
                            <TextField 
                                id={"campoBusqueda"}
                                onChange={this.onChange}
                                value={this.state.busqueda}
                            />
                        </div>
                        <div className="level-element is-hidden-touch">
                            <h2 className="is-size-3 title">
                                &nbsp;&nbsp;<i className="fa fa-search" aria-hidden="true"></i>
                            </h2>
                        </div>
                        
                    </div>
                </div>
                    
                </div>
                </div>
                </div>
                <div className="section">
                    {this.renderSecciones()}
                </div>
            </div>
        )
    }
}

export default Busqueda;
