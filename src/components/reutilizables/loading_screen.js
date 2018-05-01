import React from 'react';

function LoadingScreen(props){
    return (
    <div className='hero is-large'>
        <div className="hero-body">
            <div className="level" >
                <div className="level-item">
                    <div className="spinner">
                    </div>
                </div>
            </div>
            {props.nombre ? (
                <div className="level" >
                    <div className="level-item">
                        <h2>Cargando {props.nombre}</h2>
                    </div>
                </div>
            ): <div></div>}
        </div>
    </div>
    );
};

export default LoadingScreen;