import React, { Component } from 'react';
import { Link } from "react-router-dom";

class ErrorScreen extends Component {
	constructor(props) {
		super(props);
  	}

	render(){
        return (
            <div className="hero is-info is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <h2 className="title has-text-centered is-size-3">
                            Parece que sucedió un error
                        </h2>
                        <h2 className="title has-text-centered is-size-4">
                            Vuelve a la página de inicio, nosotros nos encargaremos de corregirlo :)
                        </h2>
                        <h1 className="title has-text-centered is-size-2">
                            <Link to="/" style={{color: '#171717'}}>Regresar</Link>
                        </h1>
                        <br />
                    </div>
                </div>
            </div>
        )
	}
}


export default ErrorScreen;