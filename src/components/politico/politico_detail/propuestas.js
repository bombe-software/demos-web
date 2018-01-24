import React, { Component } from "react";
import { Link } from "react-router-dom";

class Propuestas extends Component {
    constructor(props) {
        super(props);
        this.renderPropuestaList = this.renderPropuestaList.bind(this);
        this.renderLike = this.renderLike.bind(this);
    }



    renderLike(user, propuestas_like, propuesta){
        let propuesta_like = _.filter(propuestas_like, {'id_propuesta': propuesta.id_propuesta});
        let isLiked = false;
        let count_actual = undefined;
        if (_.filter(this.props.count, {'id_propuesta': propuesta.id_propuesta})[0] != undefined){
            count_actual = _.filter(this.props.count, {'id_propuesta': propuesta.id_propuesta})[0].count;
        }
        if(propuesta_like[0] != undefined){
            isLiked = true;
        }
        return(
            <div>
                {count_actual}
                <a onClick={()=>{this.props.putIsliked(propuesta.id_propuesta, user.id_usuario); this.props.fetchCountLikes(propuesta.id_propuesta); this.props.fetchIsliked(user.id_usuario);}}>
                    <i className={isLiked==true ? "fa fa-thumbs-up": "fa fa-thumbs-o-up"} aria-hidden="true"></i>
                </a>
            </div>
        );
    }



    renderPropuestaList() {
        console.log(this.props);
      //  const {user, propuestas_like}  = this.props;
       // const {renderLike} = this;
        return this.props.Politico.propuestas.map(({id, fecha, titulo, tipo_propuesta})=> {
            return (
                <div key={id}>
                    <div className="panel-block">
                      <p className="is-size-5">
                          <a className="has-text-dark">{titulo}</a> &nbsp;{" "}&nbsp;<span className="is-size-7 tag is-light has-text-right">{tipo_propuesta.tipo}</span>
                      </p>
                          <div className={tipo!="Funcionario" ? "hidden" : ""}>
                          {user != undefined  && propuestas_like != undefined ?
                              renderLike(user, propuestas_like, propuesta)
                           : console.log('vacio')}
                          </div>
                    </div>
                </div>
            );
        });
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
        if(this.props.Politico != undefined){
            return (
                <div>
                  <div className="level">
                    <div className="level-left"></div>
                    <div className="level-right">
                      <div className="level-item">
                        <p className="has-text-right">
                          <Link to={"/crear/propuestas/"+this.props.Politico.id} className="button is-success">
                            <i className="fa fa-plus" aria-hidden="true"></i>
                            &nbsp;&nbsp;&nbsp;Agregar una propuesta
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                    <div className="panel">
                      <div className="panel-heading">
                        Propuestas del político
                      </div>
                      {this.renderPropuestaList()}
                    </div>
                </div>
            );
        }else{
            return(
                    <div className="spinner">
                    </div>
            );
        }
    }
}

export default Propuestas;
