import React, {Component} from 'react';
import { Link } from "react-router-dom";

class CardPolitico extends Component {
    render(){
        let {o} = this.props;
        return (
            <div>
                <Link to={'/politico/' + o.id} >
                    <div className="card">
                    <div className="card-content">
                        <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">{o.nombre}</p>
                            <p className="subtitle is-6">
                                {o.partido.nombre}
                                {this.props.tipo ? <span>, {o.tipo}</span>: <span></span>}
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </Link>
            </div>
        );
    }
};

export default CardPolitico;