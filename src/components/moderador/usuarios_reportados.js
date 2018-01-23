import React, { Component } from "react";
import _ from "lodash";

class UsuariosReportados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accusationList : [
                {
                    id: 0, 
                    userGuilty: "Saul",
                    idUserGuilty: 1,
                    userAccuser: "Anguiano",
                    idUserAccuser: 2,
                    date: "21/09/2017",
                    description: "Eres un chivo malo",
                    img: "alguna imagen"
                },
                {
                    id: 1, 
                    userGuilty: "Jaiba",
                    idUserGuilty: 3,
                    userAccuser: "Anguiano",
                    idUserAccuser: 2,                   
                    date: "21/09/2017",
                    description: "Eres una jaba mala",
                    img: "alguna imagen"
                }
            ],
            accusationActive : 0
        };
        this.renderAccusationList = this.renderAccusationList.bind(this);
        this.updateAccusationActive = this.updateAccusationActive.bind(this);
    }

    updateAccusationActive(int){
        return(()=>{
            this.setState({ accusationActive : int });
        });
    }

    renderAccusationList() {
        return _.map(this.state.accusationList, accusationItem => {
            if(this.state.accusationList[this.state.accusationActive] == accusationItem){
                return (
                    <div key={accusationItem.id+ '_' + accusationItem.idUserAccuser + '_' + accusationItem.idUserGuilty}>
                        Usuario acusado:  {accusationItem.userGuilty}
                        <div>
                            Sancionar
                            <a className = "button is-success is-inverted">Aprobar</a>
                            <a className = "button is-success is-inverted">Denegar</a>
                        </div>
                    </div>
                  );
            }else{
                return (
                    <div key={accusationItem.id+ '_' + accusationItem.idUserAccuser + '_' + accusationItem.idUserGuilty}>
                        <a onClick={this.updateAccusationActive(accusationItem.id)}>
                            Usuario acusado:  {accusationItem.userGuilty}
                        </a>
                    </div>
                );
            }
        });
      }
    renderAccusationDetail() {
        let accusation = this.state.accusationList[this.state.accusationActive];
          return (
            <div>
                {accusation.date}<br />
                Acusado por: {accusation.userAccuser}<br />
                Descripción de la falta: <br />
                {accusation.description}<br />
                Prueba<br />
                {accusation.img}<br />
            </div>
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
                <div>
                    {this.renderAccusationList()}
                </div>
                <div>
                    {this.renderAccusationDetail()}
                </div>
            </div>
        )
    }
}

export default UsuariosReportados;