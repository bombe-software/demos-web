import React, {Component} from 'react';
import { Link } from "react-router-dom";

class CardPropuesta extends Component {

    renderCard(o){
        return (
            <Link to={`/politico/${o.politico.id}/propuesta/${o.id}`} >
                    <div className="card">
                    <div className="card-content">
                    <div className="media-content">
                        <p className="title is-5">{o.titulo}</p>
                        <span className="subtitle is-6">
                            <p><i className="fa fa-tag" aria-hidden="true"></i>&nbsp;{o.tipo_propuesta.tipo}</p>
                            {this.props.politico && o.politico? <p>
                                <i className="fa fa-user" aria-hidden="true"></i>&nbsp;
                                {o.politico.nombre}
                            </p>:<div></div>}
                        </span>
                    </div>
                    </div>
                    </div>
                </Link>
        );
    }

    render(){
        let {o} = this.props;
        return (
            <div>
                {o.politico ? this.renderCard(o): <div></div>}
            </div>
        );
    }
};

export default CardPropuesta;